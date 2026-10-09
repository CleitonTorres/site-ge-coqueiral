"use client";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./styles.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function RegistrationPdfPreview({ url }: { url: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(280);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.min(900, Math.floor(entry.contentRect.width))),
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPage(1);
    setPages(0);
  }, [url]);
  
  return (
    <div ref={container} className={styles.pdfPreview}>
      <nav className={styles.row} aria-label="Páginas do PDF">
        <button
          className={styles.button}
          disabled={page <= 1}
          onClick={() => setPage((value) => value - 1)}
        >
          Anterior
        </button>
        <span aria-live="polite">
          Página {page} de {pages || "…"}
        </span>
        <button
          className={styles.button}
          disabled={page >= pages}
          onClick={() => setPage((value) => value + 1)}
        >
          Próxima
        </button>
      </nav>
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setPages(numPages)}
        loading="Carregando prévia…"
        error="Não foi possível exibir a prévia. Use Baixar PDF para abrir o arquivo."
      >
        <Page
          pageNumber={page}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading="Carregando página…"
        />
      </Document>
    </div>
  );
}
