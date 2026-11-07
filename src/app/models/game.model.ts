export type Plataforma = 'PS5' | 'PS4';

export type Genero =
  | 'Ação'
  | 'Aventura'
  | 'RPG'
  | 'Esporte'
  | 'Corrida'
  | 'Terror'
  | 'Indie';

export interface Jogo {
  id: number;
  titulo: string;
  estudio: string;
  descricao: string;
  capa: string;
  banner?: string;
  preco: number;
  precoAntigo?: number;
  desconto?: number;
  nota: number;
  genero: Genero;
  plataformas: Plataforma[];
  lancamento: string;
  destaque?: boolean;
  tags: string[];
}

export interface ItemCarrinho {
  jogo: Jogo;
  quantidade: number;
}
