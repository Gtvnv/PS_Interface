import { Component, Input, computed, signal } from '@angular/core';

/** Paletas de gradiente associadas a cada "slug" de capa. */
const PALETAS: Record<string, [string, string]> = {
  horizon: ['#f7971e', '#b91d73'],
  spiderman: ['#c31432', '#240b36'],
  gow: ['#283048', '#859398'],
  gt7: ['#1f4037', '#99f2c8'],
  tlou: ['#434343', '#000000'],
  demons: ['#3a1c71', '#d76d77'],
  ratchet: ['#00c6ff', '#0072ff'],
  fc25: ['#11998e', '#38ef7d'],
  re4: ['#870000', '#190a05'],
  stray: ['#fc5c7d', '#6a82fb'],
  ghost: ['#eb3349', '#f45c43'],
  returnal: ['#4568dc', '#b06ab3'],
};

const PADRAO: [string, string] = ['#0070d1', '#00234b'];

@Component({
  selector: 'app-game-cover',
  standalone: true,
  template: `
    <div class="cover" [style.background]="gradiente()">
      <span class="initial">{{ inicial() }}</span>
      <span class="glow"></span>
    </div>
  `,
  styles: [
    `
      .cover {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        overflow: hidden;
        isolation: isolate;
      }
      .initial {
        font-size: clamp(2.5rem, 6vw, 5rem);
        font-weight: 800;
        color: rgba(255, 255, 255, 0.92);
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
        letter-spacing: -2px;
        z-index: 1;
      }
      .glow {
        position: absolute;
        inset: -40% -40% auto auto;
        width: 120%;
        height: 120%;
        background: radial-gradient(
          circle at 70% 30%,
          rgba(255, 255, 255, 0.28),
          transparent 55%
        );
        z-index: 0;
      }
    `,
  ],
})
export class GameCoverComponent {
  private readonly slug = signal<string>('');

  @Input() titulo = '';

  @Input({ required: true })
  set capa(valor: string) {
    this.slug.set(valor);
  }

  readonly inicial = computed(() => (this.titulo || '?').charAt(0).toUpperCase());

  readonly gradiente = computed(() => {
    const [a, b] = PALETAS[this.slug()] ?? PADRAO;
    return `linear-gradient(135deg, ${a}, ${b})`;
  });
}
