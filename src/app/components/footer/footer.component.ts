import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <span class="footer__logo">PS<strong>Interface</strong></span>
          <p>Projeto de estudo — uma loja de jogos inspirada na PlayStation Store, construída com Angular.</p>
        </div>
        <nav class="footer__links" aria-label="Rodapé">
          <a href="#">Suporte</a>
          <a href="#">Termos de uso</a>
          <a href="#">Privacidade</a>
          <a
            href="https://github.com/Gtvnv/PS_Interface"
            target="_blank"
            rel="noopener"
            >GitHub</a
          >
        </nav>
      </div>
      <p class="footer__copy">
        © {{ ano }} PSInterface. Projeto demonstrativo sem fins comerciais.
      </p>
    </footer>
  `,
  styles: [
    `
      .footer {
        border-top: 1px solid var(--border);
        background: #060a12;
        margin-top: 40px;
      }
      .footer__inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 40px 20px 24px;
        display: flex;
        justify-content: space-between;
        gap: 30px;
        flex-wrap: wrap;
      }
      .footer__logo {
        font-size: 1.15rem;
        strong {
          color: var(--accent-soft);
          font-weight: 800;
        }
      }
      .footer__brand p {
        color: var(--text-dim);
        max-width: 42ch;
        margin: 10px 0 0;
        line-height: 1.5;
        font-size: 0.9rem;
      }
      .footer__links {
        display: flex;
        gap: 22px;
        flex-wrap: wrap;
        align-items: flex-start;
      }
      .footer__links a {
        color: var(--text-dim);
        text-decoration: none;
        font-size: 0.9rem;
        &:hover {
          color: var(--text);
        }
      }
      .footer__copy {
        text-align: center;
        color: var(--text-dim);
        font-size: 0.82rem;
        padding: 0 20px 28px;
        margin: 0;
      }
    `,
  ],
})
export class FooterComponent {
  readonly ano = new Date().getFullYear();
}
