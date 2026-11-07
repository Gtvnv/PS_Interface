import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Jogo } from '../../models/game.model';
import { CartService } from '../../services/cart.service';
import { GameCoverComponent } from '../game-cover/game-cover.component';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, RouterLink, GameCoverComponent],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  @Input({ required: true }) jogo!: Jogo;

  private readonly cart = inject(CartService);

  adicionar(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.cart.adicionar(this.jogo);
  }

  get noCarrinho(): boolean {
    return this.cart.contem(this.jogo.id);
  }
}
