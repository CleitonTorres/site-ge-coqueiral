'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { PrintableRegistration } from './printTypes';
import styles from './styles.module.css';

const Preview = dynamic(() => import('./registrationPdfPreview'), { ssr: false });
type Result = { registrations: PrintableRegistration[]; forms: { slug: string; title: string }[]; total: number; pageSize: number };

export default function RegistrationPrintAdmin() {
  const [forms, setForms] = useState<Result['forms']>([]);
  const [slug, setSlug] = useState('');
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('list');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [output, setOutput] = useState<{ url: string; filename: string; count: number } | null>(null);
  const controller = useRef<AbortController | null>(null);
  const blobUrl = useRef('');
  useEffect(() => {
    const initial = new AbortController();
    fetch('/api/inscricoes/recebidas?page=1', { cache: 'no-store', signal: initial.signal }).then(async response => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível carregar os formulários.');
      setForms(data.forms);
    }).catch(error => { if (!initial.signal.aborted) setError(error.message); });
    return () => { initial.abort(); controller.current?.abort(); if (blobUrl.current) URL.revokeObjectURL(blobUrl.current); };
  }, []);

  function clearOutput() {
    if (blobUrl.current) URL.revokeObjectURL(blobUrl.current);
    blobUrl.current = ''; setOutput(null);
  }

  async function generate(event: FormEvent) {
    event.preventDefault();
    const request = new AbortController(); controller.current = request;
    setBusy(true); setError(''); clearOutput();
    try {
      const records: PrintableRegistration[] = [];
      let expected = 0;
      for (let page = 1; ; page++) {
        const params = new URLSearchParams({ slug, search: search.trim(), page: String(page) });
        const response = await fetch(`/api/inscricoes/recebidas?${params}`, { cache: 'no-store', signal: request.signal });
        const data: Result & { error?: string } = await response.json();
        if (!response.ok) throw new Error(data.error || 'Não foi possível consultar as inscrições.');
        if (page === 1) expected = data.total;
        if (data.total !== expected) throw new Error('As inscrições mudaram durante a consulta. Gere o PDF novamente.');
        records.push(...data.registrations);
        if (records.length >= expected) break;
        if (!data.registrations.length) throw new Error('Consulta incompleta. Tente novamente.');
      }
      if (!records.length) throw new Error('Nenhuma inscrição encontrada para estes filtros.');
      if (new Set(records.map(record => record.registrationId)).size !== expected) throw new Error('As inscrições mudaram durante a consulta. Gere o PDF novamente.');
      const [{ pdf }, { default: PdfDocument }] = await Promise.all([import('@react-pdf/renderer'), import('./registrationPdfDocument')]);
      if (request.signal.aborted) return;
      const title = forms.find(form => form.slug === slug)?.title || 'Todos os formulários';
      const blob = await pdf(<PdfDocument records={records} tickets={mode === 'tickets'} title={title} generatedAt={new Date().toLocaleString('pt-BR')} />).toBlob();
      if (request.signal.aborted) return;
      blobUrl.current = URL.createObjectURL(blob);
      setOutput({ url: blobUrl.current, filename: `${mode === 'tickets' ? 'tickets-sorteio' : 'inscricoes'}-${slug || 'todos'}.pdf`, count: records.length });
    } catch (error) { if (!request.signal.aborted) setError((error as Error).message); }
    finally { if (!request.signal.aborted) setBusy(false); }
  }

  return <section className={styles.panel} aria-busy={busy}>
    <h2>Impressão de inscrições e tickets</h2>
    <p className={styles.hint}>O PDF inclui todas as inscrições concluídas dos filtros escolhidos. As cartelas têm 21 tickets por folha A4, em 3 colunas e 7 linhas, um por inscrição, com nome e protocolo.</p>
    <form onSubmit={generate} className={styles.grid}>
      <div className={styles.field}><label htmlFor="print-form">Formulário</label><select id="print-form" disabled={busy} value={slug} onChange={event => { setSlug(event.target.value); clearOutput(); }}><option value="">Todos os formulários</option>{forms.map(form => <option key={form.slug} value={form.slug}>{form.title}</option>)}</select></div>
      <div className={styles.field}><label htmlFor="print-search">Nome ou protocolo</label><input id="print-search" disabled={busy} value={search} maxLength={100} onChange={event => { setSearch(event.target.value); clearOutput(); }} /></div>
      <div className={styles.field}><label htmlFor="print-mode">Documento</label><select id="print-mode" disabled={busy} value={mode} onChange={event => { setMode(event.target.value); clearOutput(); }}><option value="list">Lista de inscrições e kits</option><option value="tickets">Cartelas de tickets para sorteio</option></select></div>
      <button className={styles.button} disabled={busy}>{busy ? 'Gerando PDF…' : 'Gerar PDF'}</button>
    </form>
    {busy && <p role="status">Reunindo inscrições e preparando o documento…</p>}
    {error && <p role="alert" className={styles.error}>{error}</p>}
    {output && <><p role="status">PDF gerado com {output.count} inscrição(ões).</p>
      <div className={styles.row}><a className={styles.button} href={output.url} download={output.filename}>Baixar PDF</a><a className={`${styles.button} ${styles.secondary}`} href={output.url} target="_blank" rel="noopener noreferrer">Abrir PDF para imprimir</a></div>
      <p className={styles.hint}>Para imprimir, abra o PDF e use a opção de impressão do navegador ou leitor. Para as cartelas, escolha papel A4 e tamanho real (100%). No celular, baixe o arquivo para imprimir ou compartilhar.</p>
      <Preview url={output.url} />
    </>}
  </section>;
}
