import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { GameCoverComponent } from '../../components/game-cover/game-cover.component';
import { Jogo } from '../../models/game.model';
import { CartService } from '../../services/cart.service';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GameCardComponent, GameCoverComponent, RouterLink, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly games = inject(GamesService);
  private readonly cart = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly destaques = this.games.listarDestaques();
  readonly heroJogo: Jogo = this.destaques[0];
  readonly promocoes = this.games.listarEmPromocao();
  readonly generos = this.games.listarGeneros();

  readonly filtroGenero = signal<string>('Todos');

  private readonly params = toSignal(
    this.route.queryParamMap.pipe(
      map((p) => ({ q: p.get('q') ?? '', cat: p.get('cat') ?? '' }))
    ),
    { initialValue: { q: '', cat: '' } }
  );

  readonly termoBusca = computed(() => this.params().q);
  readonly categoria = computed(() => this.params().cat);

  readonly jogosFiltrados = computed(() => {
    const { q, cat } = this.params();
    let lista: Jogo[] = this.games.buscar(q);

    if (cat === 'promocoes') {
      lista = lista.filter((j) => j.desconto && j.desconto > 0);
    } else if (cat === 'ps5') {
      lista = lista.filter((j) => j.plataformas.includes('PS5'));
    }

    const g = this.filtroGenero();
    if (g !== 'Todos') {
      lista = lista.filter((j) => j.genero === g);
    }
    return lista;
  });

  readonly tituloSecao = computed(() => {
    const { q, cat } = this.params();
    if (q) return `Resultados para "${q}"`;
    if (cat === 'promocoes') return 'Ofertas em destaque';
    if (cat === 'ps5') return 'Exclusivos e jogos de PS5';
    return 'Catálogo completo';
  });

  selecionarGenero(g: string): void {
    this.filtroGenero.set(g);
  }

  adicionarHero(): void {
    this.cart.adicionar(this.heroJogo);
  }

  limparFiltros(): void {
    this.filtroGenero.set('Todos');
    this.router.navigate(['/'], { queryParams: {} });
  }
}
