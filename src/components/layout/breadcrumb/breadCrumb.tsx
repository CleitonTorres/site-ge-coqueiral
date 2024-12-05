'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './breadCrumb.module.css';

const Breadcrumb = () => {
  const pathname = usePathname(); // Obtém o caminho atual da URL

  // Divide a URL em segmentos removendo a barra inicial e cria os breadcrumbs
  const segments = pathname.split('/').filter((segment) => segment);

  return (
    <nav aria-label="breadcrumb" className={styles.conteiner}>
      <ol style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
        {/* Adiciona o link para a home */}
        <li style={{ marginRight: '8px' }}>
          <Link href="/">Home</Link>
          <span style={{ margin: '0 8px' }}>/</span>
        </li>

        {/* Itera pelos segmentos para criar os itens do breadcrumb */}
        {segments.map((segment, index) => {
          // Cria o link para o segmento atual
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1; // Verifica se é o último item

          return (
            <li key={href} style={{ marginRight: '8px' }}>
              {isLast ? (
                <span>{decodeURIComponent(segment)}</span>
              ) : (
                <>
                  <Link href={href}>{decodeURIComponent(segment)}</Link>
                  <span style={{ margin: '0 8px' }}>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
