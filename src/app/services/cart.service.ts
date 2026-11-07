import { Injectable, computed, signal } from '@angular/core';
import { ItemCarrinho, Jogo } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itens = signal<ItemCarrinho[]>([]);

  /** Itens do carrinho (somente leitura). */
  readonly lista = this.itens.asReadonly();

  /** Quantidade total de produtos no carrinho. */
  readonly quantidadeTotal = computed(() =>
    this.itens().reduce((total, item) => total + item.quantidade, 0)
  );

  /** Valor total do carrinho. */
  readonly valorTotal = computed(() =>
    this.itens().reduce((total, item) => total + item.jogo.preco * item.quantidade, 0)
  );

  adicionar(jogo: Jogo): void {
    this.itens.update((itens) => {
      const existente = itens.find((i) => i.jogo.id === jogo.id);
      if (existente) {
        return itens.map((i) =>
          i.jogo.id === jogo.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...itens, { jogo, quantidade: 1 }];
    });
  }

  remover(jogoId: number): void {
    this.itens.update((itens) => itens.filter((i) => i.jogo.id !== jogoId));
  }

  alterarQuantidade(jogoId: number, delta: number): void {
    this.itens.update((itens) =>
      itens
        .map((i) =>
          i.jogo.id === jogoId
            ? { ...i, quantidade: Math.max(0, i.quantidade + delta) }
            : i
        )
        .filter((i) => i.quantidade > 0)
    );
  }

  contem(jogoId: number): boolean {
    return this.itens().some((i) => i.jogo.id === jogoId);
  }

  limpar(): void {
    this.itens.set([]);
  }
}
