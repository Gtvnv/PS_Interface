import { Injectable } from '@angular/core';
import { JOGOS } from '../data/games.data';
import { Jogo } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private readonly jogos: Jogo[] = JOGOS;

  listarTodos(): Jogo[] {
    return this.jogos;
  }

  listarDestaques(): Jogo[] {
    return this.jogos.filter((j) => j.destaque);
  }

  listarEmPromocao(): Jogo[] {
    return this.jogos.filter((j) => j.desconto && j.desconto > 0);
  }

  obterPorId(id: number): Jogo | undefined {
    return this.jogos.find((j) => j.id === id);
  }

  buscar(termo: string): Jogo[] {
    const t = termo.trim().toLowerCase();
    if (!t) {
      return this.jogos;
    }
    return this.jogos.filter(
      (j) =>
        j.titulo.toLowerCase().includes(t) ||
        j.estudio.toLowerCase().includes(t) ||
        j.genero.toLowerCase().includes(t) ||
        j.tags.some((tag) => tag.toLowerCase().includes(t))
    );
  }

  listarGeneros(): string[] {
    return [...new Set(this.jogos.map((j) => j.genero))].sort();
  }
}
