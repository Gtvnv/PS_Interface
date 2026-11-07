import { CurrencyPipe, DatePipe, DecimalPipe, Location } from '@angular/common';
import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { GameCoverComponent } from '../../components/game-cover/game-cover.component';
import { CartService } from '../../services/cart.service';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    DatePipe,
    RouterLink,
    GameCoverComponent,
    GameCardComponent,
  ],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss',
})
export class GameDetailComponent {
  private readonly games = inject(GamesService);
  private readonly cart = inject(CartService);
  private readonly location = inject(Location);

  /** Vinculado via rota (withComponentInputBinding). */
  readonly id = input(0, { transform: numberAttribute });

  readonly jogo = computed(() => this.games.obterPorId(this.id()));

  readonly relacionados = computed(() => {
    const atual = this.jogo();
    if (!atual) return [];
    return this.games
      .listarTodos()
      .filter((j) => j.id !== atual.id && j.genero === atual.genero)
      .slice(0, 4);
  });

  readonly noCarrinho = computed(() => {
    const j = this.jogo();
    return j ? this.cart.contem(j.id) : false;
  });

  adicionar(): void {
    const j = this.jogo();
    if (j) this.cart.adicionar(j);
  }

  voltar(): void {
    this.location.back();
  }
}
