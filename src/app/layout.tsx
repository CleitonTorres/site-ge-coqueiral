"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import './layout.css';
import './accessibility.css';

const groups = [
  { title: 'Quem somos', links: [
    ['Em Coqueiral', '/coqueiral'], ['Escoteiros do Brasil', '/escoteiros-do-brasil'], ['No mundo', 'https://www.escoteiros.org.br/internacional/'], ['No Brasil', 'https://www.escoteiros.org.br/brasil/'],
    ['Governança', '/governanca'], ['Proteção infantojuvenil', '/protecao-infantojuvenil'], ['Conselhos', '/conselhos'], ['Diretoria', '/diretoria'],
  ] },
  { title: 'O que fazemos', links: [
    ['Projeto educativo', '/projeto-educativo'], ['Método escoteiro', '/metodo-escoteiro'], ['Escotismo e ODS', '/escotismo-ods'], ['Espaços seguros', '/espacos-seguros'],
    ['Eventos', '/eventos'], ['Notícias', '/aconteceu'], ['MutEco', '/muteco'], ['MutCom', '/mutcom'], ['Educação escoteira', '/edu-escoteira'],
  ] },
  { title: 'Projetos', links: [
    ['Todos os projetos', '/projetos'], ['Acampa Canoa', '/projetos/acampa-canoa'], ['Pipa Escoteira', '/projetos/pipa-escoteira'], ['De Óleo na Reciclagem', '/projetos/oleo-na-reciclagem'],
    ['Escoteiros pela Biodiversidade', '/projetos/escoteiros-pela-biodiversidade'], ['Escoteiro Dev', '/projetos/escoteiro-dev'], ['Dia de Semear Paz', '/projetos/dia-de-semear-paz'],
  ] },
  { title: 'Participe', links: [
    ['Como ser escoteiro', '/seja-escoteiro'], ['Ramo Lobinho', '/ramo-lobinho'], ['Ramo Escoteiro', '/ramo-escoteiro'], ['Ramo Sênior', '/ramo-senior'], ['Ramo Pioneiro', '/ramo-pioneiro'],
    ['Seja voluntário', '/seja-escoteiro'], ['Como abrir uma UEL', '/como-abrir-uma-uel'], ['Clube de vantagens', 'https://www.escoteiros.org.br/clube-de-vantagens/'],
  ] },
  { title: 'Fale conosco', links: [
    ['Contato', 'https://www.instagram.com/19escoqueiral/'], ['Galeria de fotos', '/galeria-fotos'], ['Faça uma doação', '/doe'], ['Empresa parceira', '/empresa-parceira'],
  ] },
];
const memberLinks = [
  ['Especialidades', 'https://www.escoteiros.org.br/especialidades/'], ['Progressão', '/progressao'], ['Tribo da Terra', '/tribo-da-terra'],
  ['Ciclo de vida', '/ciclo-vida'], ['Campo Escola Virtual', '/campo-escola'], ['Acesso administrativo', '/administrativo'],
  ['Área da Região', 'https://escoteiroses.org.br/'], ['Loja Nacional', 'https://loja.escoteiros.org.br/'], ['Paxtu', 'https://paxtu.escoteiros.org.br/'],
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  return <Link href={href} aria-current={pathname === href ? 'page' : undefined} {...(href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label}{href.startsWith('https:') && <span className="sr-only"> (abre em nova aba)</span>}</Link>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isPrinterRoute = pathname.includes('/printer');

  useEffect(() => {
    setMenuOpen(false);
    header.current?.querySelectorAll('details[open]').forEach(detail => detail.removeAttribute('open'));
  }, [pathname]);

  return (
    <html lang="pt-BR">
      <head>
        <meta name="google-site-verification" content="RJr9dk5TXSf7loXF4hfxMGts_RSZp63yB6crb-bUSCI" />
        <meta name="google-site-verification" content="c7o2q50eN9ml30c4yZ6gkc4a0Qd0C0eQMvSGzbaESo8" />
      </head>
      <body>
        {pathname.startsWith('/administrativo') && process.env.RECAPTCHA_KEY_SITE && <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_KEY_SITE}`} />}
        {!isPrinterRoute && <>
          <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
          <header className="site-header" ref={header} onKeyDown={event => {
            if (event.key !== 'Escape') return;
            const detail = (event.target as HTMLElement).closest('details');
            if (detail?.open) { detail.open = false; detail.querySelector('summary')?.focus(); }
            else { setMenuOpen(false); menuButton.current?.focus(); }
          }}>
            <div className="utility-bar"><div><span>19º ES · Coqueiral, Aracruz</span><nav aria-label="Acesso rápido"><Link href="/administrativo">Área do associado</Link><a href="https://www.instagram.com/19escoqueiral/" target="_blank" rel="noopener noreferrer">Instagram<span className="sr-only"> (abre em nova aba)</span></a></nav></div></div>
            <div className="brand-row">
              <Link href="/" className="brand" aria-label="Escoteiros de Coqueiral — início"><Image src="/icons/logo.png" alt="Escoteiros do Brasil" width={270} height={90} priority /><span>Grupo Escoteiro<br /><strong>Coqueiral · 19º ES</strong></span></Link>
              <div className="header-actions"><Link href="/empresa-parceira">Seja uma empresa parceira</Link><Link className="donate-link" href="/doe">Doe agora</Link></div>
              <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '✕ Fechar' : '☰ Menu'}</button>
            </div>
            <nav id="main-navigation" className={`main-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
              <div className="nav-inner"><NavLink href="/" label="Início" />
                {groups.map(group => <details key={group.title} name="navigation" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) event.currentTarget.open = false; }}>
                  <summary>{group.title}<span aria-hidden="true">⌄</span></summary>
                  <ul>{group.links.map(([label, href]) => <li key={label}><NavLink href={href} label={label} /></li>)}</ul>
                </details>)}
                <Link className="mobile-donate" href="/doe">Doe agora</Link>
              </div>
            </nav>
          </header>
        </>}
        <main id="conteudo" tabIndex={-1}>{children}</main>
        {!isPrinterRoute && <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-intro"><Image src="/logo/logo.png" width={80} height={80} alt="" /><h2>Grupo Escoteiro Coqueiral</h2><p>Educação para a vida.<br />Coqueiral, Aracruz — Espírito Santo.</p><a href="https://www.instagram.com/19escoqueiral/" target="_blank" rel="noopener noreferrer">@19escoqueiral<span className="sr-only"> (abre em nova aba)</span></a></div>
            <nav aria-label="Links do associado"><h2>Para quem faz parte</h2><ul>{memberLinks.map(([label, href]) => <li key={label}><NavLink href={href} label={label} /></li>)}</ul></nav>
            <nav aria-label="Participe e apoie"><h2>Vamos construir juntos</h2><ul><li><Link href="/seja-escoteiro">Seja escoteiro ou voluntário</Link></li><li><Link href="/projetos">Conheça nossos projetos</Link></li><li><Link href="/doe">Faça uma doação</Link></li><li><Link href="/empresa-parceira">Seja uma empresa parceira</Link></li><li><Link href="/espacos-seguros">Espaços seguros</Link></li></ul><a className="award" href="https://www.premiomelhores.org/dados-2023/" target="_blank" rel="noopener noreferrer"><Image src="/icons/selo2023.png" width={64} height={64} alt="Prêmio Melhores ONGs 2023 (abre em nova aba)" /></a></nav>
          </div>
          <div className="footer-bottom">© {new Date().getFullYear()} Grupo Escoteiro Coqueiral · Escoteiros do Brasil</div>
          <Analytics />
        </footer>}
      </body>
    </html>
  );
}
