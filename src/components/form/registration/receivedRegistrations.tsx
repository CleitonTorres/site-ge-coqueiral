"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";

type Registration = {
  registrationId: string;
  protocol?: string;
  slug: string;
  submittedAt: string;
  form: { title: string; fields: { id: string; label: string }[] };
  answers: Record<string, string>;
  kits: { id: string; name: string; quantity: number; subtotalCents: number }[];
  totalCents: number;
  driveFolderId?: string;
  documents?: { id: string; name: string }[];
};
type Result = {
  registrations: Registration[];
  forms: { slug: string; title: string }[];
  total: number;
  page: number;
  pageSize: number;
};
const money = (value: number) =>
  (value / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function ReceivedRegistrations() {
  const [result, setResult] = useState<Result | null>(null);
  const [slug, setSlug] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    (async () => {
      try {
        const params = new URLSearchParams({
          slug,
          search,
          page: String(page),
        });
        const response = await fetch(`/api/inscricoes/recebidas?${params}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setResult(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setResult(null);
          setError((error as Error).message);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [slug, search, page, refresh]);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
    setRefresh((value) => value + 1);
  }

  return (
    <section className={styles.panel} aria-busy={loading}>
      <div className={styles.editorHeading}>
        <h2>Inscrições recebidas</h2>
        <button
          className={`${styles.button} ${styles.secondary}`}
          disabled={loading}
          onClick={() => setRefresh((value) => value + 1)}
        >
          Atualizar
        </button>
      </div>
      <p className={styles.hint}>
        Inscrições concluídas. Os pagamentos ainda devem ser conferidos pela
        organização.
      </p>
      <form onSubmit={submit} className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="received-form">Formulário</label>
          <select
            id="received-form"
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setPage(1);
            }}
          >
            <option value="">Todos os formulários</option>
            {result?.forms.map((form) => (
              <option key={form.slug} value={form.slug}>
                {form.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="received-search">Nome ou protocolo</label>
          <input
            id="received-search"
            value={searchInput}
            maxLength={100}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <button className={styles.button} disabled={loading}>
          Buscar inscrições
        </button>
      </form>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      {loading ? (
        <p role="status">Carregando inscrições…</p>
      ) : (
        result && (
          <>
            <p role="status">{result.total} inscrição(ões) encontrada(s).</p>
            {!result.registrations.length && (
              <p className={styles.notice}>
                Nenhuma inscrição recebida para estes filtros.
              </p>
            )}
            {result.registrations.map((record) => (
              <details
                className={styles.receivedCard}
                key={record.registrationId}
              >
                <summary>
                  <strong>
                    {record.protocol || record.registrationId} ·{" "}
                    {record.answers.name ||
                      record.answers.nome ||
                      "Participante"}
                  </strong>
                  <span>{record.form.title}</span>
                  <span>
                    {new Date(record.submittedAt).toLocaleString("pt-BR")} ·{" "}
                    {money(record.totalCents)}
                  </span>
                </summary>
                <div className={styles.receivedDetails}>
                  <h3>Dados informados</h3>
                  <dl className={styles.answers}>
                    {Object.entries(record.answers).map(([id, value]) => (
                      <div key={id}>
                        <dt>
                          {record.form.fields.find((field) => field.id === id)
                            ?.label || id}
                        </dt>
                        <dd>{value || "Não informado"}</dd>
                      </div>
                    ))}
                  </dl>
                  {!!record.kits.length && (
                    <>
                      <h3>Kits solicitados</h3>
                      <ul>
                        {record.kits.map((kit) => (
                          <li key={kit.id}>
                            {kit.quantity} × {kit.name} —{" "}
                            {money(kit.subtotalCents)}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p>
                    <strong>Total: {money(record.totalCents)}</strong>
                  </p>
                  <h3>Anexos</h3>
                  {record.documents?.length ? (
                    <ul>
                      {record.documents.map((file) => (
                        <li key={file.id}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://drive.google.com/file/d/${encodeURIComponent(file.id)}/view`}
                          >
                            {file.name} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Nenhum anexo enviado.</p>
                  )}
                  {record.driveFolderId && (
                    <a
                      className={`${styles.button} ${styles.secondary}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://drive.google.com/drive/folders/${encodeURIComponent(record.driveFolderId)}`}
                    >
                      Abrir pasta da inscrição ↗
                    </a>
                  )}
                </div>
              </details>
            ))}
            {result.total > result.pageSize && (
              <nav className={styles.row} aria-label="Páginas de inscrições">
                <button
                  className={styles.button}
                  disabled={page <= 1}
                  onClick={() => setPage((value) => value - 1)}
                >
                  Anterior
                </button>
                <span>
                  Página {page} de {Math.ceil(result.total / result.pageSize)}
                </span>
                <button
                  className={styles.button}
                  disabled={page * result.pageSize >= result.total}
                  onClick={() => setPage((value) => value + 1)}
                >
                  Próxima
                </button>
              </nav>
            )}
          </>
        )
      )}
    </section>
  );
}
