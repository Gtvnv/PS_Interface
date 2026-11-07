import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameCoverComponent } from '../../components/game-cover/game-cover.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, GameCoverComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  readonly cart = inject(CartService);
  readonly finalizado = signal(false);

  finalizar(): void {
    if (this.cart.quantidadeTotal() === 0) return;
    this.finalizado.set(true);
    this.cart.limpar();
  }

  voltarAsCompras(): void {
    this.finalizado.set(false);
  }
}
