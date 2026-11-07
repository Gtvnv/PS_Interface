# PSInterface 🎮

Uma loja de jogos inspirada na **PlayStation Store**, construída com **Angular 18** (componentes standalone, signals e lazy loading de rotas). Projeto de estudo focado em praticar componentização, estado reativo e layout responsivo.

> Projeto demonstrativo, sem fins comerciais. Marcas e nomes de jogos citados pertencem aos seus respectivos donos e são usados apenas de forma ilustrativa.

## ✨ Funcionalidades

- **Vitrine completa** com hero de destaque, seções de "Em destaque" e "Ofertas".
- **Catálogo** com busca por título/estúdio/gênero/tag e filtro por gênero via chips.
- **Página de detalhe** de cada jogo, com preço, desconto, plataformas, tags e jogos relacionados.
- **Carrinho reativo** (Angular Signals): adicionar, remover, alterar quantidade, totais calculados e fluxo de "compra finalizada".
- **Tema escuro** no estilo PSN, com azul PlayStation, totalmente responsivo.
- **Capas geradas por código** (gradientes) — o projeto é autocontido e não depende de imagens externas.

## 🧱 Arquitetura

```
src/app/
├── components/        # Header, Footer, GameCard, GameCover (reutilizáveis)
├── pages/             # Home, GameDetail, Cart (lazy loaded)
├── services/          # GamesService (catálogo) e CartService (signals)
├── models/            # Tipos e interfaces (Jogo, ItemCarrinho)
├── data/              # Catálogo mock de jogos
├── app.routes.ts      # Rotas com lazy loading
└── app.config.ts      # Providers (router, locale pt-BR)
```

Conceitos aplicados:

- **Standalone components** (sem NgModules).
- **Signals** e `computed` para o estado do carrinho.
- **Control flow** nativo (`@if`, `@for`) do Angular 17+.
- **Lazy loading** de rotas com `loadComponent`.
- **Component input binding** na rota de detalhe (`withComponentInputBinding`).
- Locale `pt-BR` para formatação de moeda (R$).

## 🚀 Como rodar

Requer **Node 20** e npm.

```bash
npm install
npm start
```

Acesse `http://localhost:4200/`.

Para gerar o build de produção:

```bash
npm run build
```

Os artefatos ficam em `dist/`.

## 🛠️ Stack

- Angular 18
- TypeScript
- SCSS
