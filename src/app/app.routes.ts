import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'PSInterface — Loja de Jogos',
  },
  {
    path: 'jogo/:id',
    loadComponent: () =>
      import('./pages/game-detail/game-detail.component').then(
        (m) => m.GameDetailComponent
      ),
    title: 'Detalhes do jogo — PSInterface',
  },
  {
    path: 'carrinho',
    loadComponent: () =>
      import('./pages/cart/cart.component').then((m) => m.CartComponent),
    title: 'Carrinho — PSInterface',
  },
  { path: '**', redirectTo: '' },
];
