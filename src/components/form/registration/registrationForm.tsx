"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import Banner from "@/components/layout/banner/banner";
import {
  acceptedTypes,
  PublicForm,
  validateAnswers,
} from "@/lib/registrations/model";
import styles from "./styles.module.css";

export const money = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
type Ticket = { ticket: string; uploadUrl: string; expires: number };

export default function RegistrationFormView({ slug }: { slug: string }) {
  const [form, setForm] = useState<PublicForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{
    message: string;
    registrationId: string;
    protocol?: string;
  } | null>(null);
  const ticket = useRef<Ticket | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/inscricoes/formularios?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        if (!data.forms.length) throw new Error("Formulário não encontrado.");
        setForm(data.forms[0]);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [slug]);

  const invalidate = () => {
    ticket.current = null;
    setError("");
  };
  const total =
    form?.kits.reduce(
      (sum, kit) => sum + (quantities[kit.id] || 0) * kit.priceCents,
      0,
    ) || 0;

  function addFiles(selected: File[]) {
    if (!form) return;
    invalidate();
    if (files.length + selected.length > form.maxFiles) {
      setError(`Envie até ${form.maxFiles} arquivos.`);
      return;
    }
    if (
      selected.some(
        (file) =>
          !acceptedTypes.includes(file.type) ||
          file.size === 0 ||
          file.size > form.maxFileSizeMB * 1024 * 1024,
      )
    ) {
      setError(
        `Envie PDF, JPG, PNG ou WebP de até ${form.maxFileSizeMB} MB cada.`,
      );
      return;
    }
    setFiles([...files, ...selected]);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form || busy) return;
    setError("");
    try {
      validateAnswers(form, { answers, quantities });
      if (form.filesRequired && !files.length)
        throw new Error("Anexe o comprovante de pagamento.");
      setBusy(true);

      if (!ticket.current || ticket.current.expires <= Date.now()) {
        if (
          !process.env.RECAPTCHA_KEY_SITE ||
          typeof grecaptcha === "undefined"
        )
          throw new Error(
            "A verificação de segurança não carregou. Atualize a página e tente novamente.",
          );
        const captcha = await new Promise<string>((resolve, reject) =>
          grecaptcha.ready(() => {
            grecaptcha
              .execute(process.env.RECAPTCHA_KEY_SITE!, { action: "inscricao" })
              .then(resolve, reject);
          }),
        );
        const authorization = await fetch("/api/inscricoes/autorizar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: form.slug,
            revision: form.revision,
            answers,
            quantities,
            captcha,
          }),
        });
        const data = await authorization.json();
        if (!authorization.ok) throw new Error(data.error);
        ticket.current = data;
      }

      const multipart = new FormData();
      files.forEach((file) => multipart.append("files", file));
      // Send large attachments directly to the external server, avoiding Next/Vercel body limits.
      const response = await fetch(ticket.current!.uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ticket.current!.ticket}`,
        },
        body: multipart,
      });

      const data = await response.json().catch(() => ({
        error: "O servidor não respondeu corretamente. Tente novamente.",
      }));

      if (!response.ok) {
        if (response.status === 401) ticket.current = null;
        throw new Error(data.error);
      }

      setSuccess(data);
      setFiles([]);
      ticket.current = null;
      
      const targetScroll = document.getElementById("form");
      targetScroll?.scrollIntoView({ 
        behavior: "smooth",
        block: "center",  // Centraliza o elemento verticalmente na tela
        inline: "nearest" 
      });

    } catch (error) {
      setError(
        (error as Error).message ||
          "Não foi possível enviar a inscrição. Tente novamente.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.page}>
      {process.env.RECAPTCHA_KEY_SITE && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_KEY_SITE}`}
        />
      )}
      <Banner
        title={form?.title || "Inscrições"}
        subTitle="Participe com o Coqueiral"
        paragraph={form?.description}
        imageURL="/logo/logo.png"
      />

      <div className={styles.content} id="form">
        {loading ? (
          <p role="status">Carregando formulário…</p>
        ) : !form ? (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        ) : success ? (
          <div role="status" className={styles.notice}>
            <h2>{success.message}</h2>
            <p>
              <strong>Guarde seu protocolo!</strong>
            </p>
            <p>Protocolo: {success.protocol || success.registrationId}</p>
            <Link href="/inscricoes">Ver outras inscrições →</Link>
          </div>
        ) : !form.open ? (
          <div className={styles.notice}>
            <h2>Inscrições fechadas</h2>
            <p>Este formulário não está recebendo inscrições no momento.</p>
            <Link href="/inscricoes">Ver outras inscrições →</Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <aside className={styles.info}>
              <span className={styles.eyebrow}>Antes de participar</span>
              <h2>Informações importantes</h2>
              <p>
                {form.instructions ||
                  "Preencha seus dados e confira as informações antes de enviar."}
              </p>
              <p className={styles.hint}>
                Seus dados e anexos serão enviados à organização do Grupo
                Escoteiro Coqueiral. Os comprovantes serão conferidos pela
                equipe.
              </p>
            </aside>
            <form className={styles.panel} onSubmit={submit} aria-busy={busy}>
              <h2>Sua inscrição</h2>
              <fieldset disabled={busy}>
                <div className={styles.panel} style={{ border: 0, padding: 0 }}>
                  {form.fields.map((field) => (
                    <div className={styles.field} key={field.id}>
                      <label htmlFor={`field-${field.id}`}>
                        {field.label}
                        {field.required ? " *" : " (opcional)"}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={`field-${field.id}`}
                          required={field.required}
                          maxLength={5000}
                          value={answers[field.id] || ""}
                          onChange={(e) => {
                            invalidate();
                            setAnswers({
                              ...answers,
                              [field.id]: e.target.value,
                            });
                          }}
                        />
                      ) : field.type === "select" ? (
                        <select
                          id={`field-${field.id}`}
                          required={field.required}
                          value={answers[field.id] || ""}
                          onChange={(e) => {
                            invalidate();
                            setAnswers({
                              ...answers,
                              [field.id]: e.target.value,
                            });
                          }}
                        >
                          <option value="">Selecione</option>
                          {field.options?.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={`field-${field.id}`}
                          type={field.type}
                          required={field.required}
                          maxLength={5000}
                          value={answers[field.id] || ""}
                          onChange={(e) => {
                            invalidate();
                            setAnswers({
                              ...answers,
                              [field.id]: e.target.value,
                            });
                          }}
                        />
                      )}
                    </div>
                  ))}
                  {!!form.kits.length && (
                    <fieldset>
                      <legend className={styles.legend}>
                        Escolha a quantidade de cada kit
                      </legend>
                      <p className={styles.hint}>
                        Deixe em zero os itens que não deseja.
                      </p>
                      {form.kits.map((kit) => (
                        <div className={styles.kit} key={kit.id}>
                          <div>
                            <strong>{kit.name}</strong>
                            <p>{kit.description}</p>
                            <span>{money(kit.priceCents)} por unidade</span>
                          </div>
                          <div className={styles.field}>
                            <label htmlFor={`kit-${kit.id}`}>Quantidade</label>
                            <input
                              id={`kit-${kit.id}`}
                              aria-label={`Quantidade de ${kit.name}`}
                              type="number"
                              min={0}
                              max={kit.maxQuantity}
                              step={1}
                              value={quantities[kit.id] ?? 0}
                              onChange={(e) => {
                                invalidate();
                                setQuantities({
                                  ...quantities,
                                  [kit.id]:
                                    e.target.value === ""
                                      ? 0
                                      : Number(e.target.value),
                                });
                              }}
                            />
                            <span className={styles.hint}>
                              {money(
                                (quantities[kit.id] || 0) * kit.priceCents,
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className={styles.total} aria-live="polite">
                        <span>Total dos itens</span>
                        <strong>{money(total)}</strong>
                      </div>
                    </fieldset>
                  )}
                  {form.maxFiles > 0 && (
                    <div className={styles.field}>
                      <label htmlFor="receipts">
                        Comprovante de pagamento
                        {form.filesRequired ? " *" : " (opcional)"}
                      </label>
                      <p id="file-help" className={styles.hint}>
                        Até {form.maxFiles} arquivos PDF, JPG, PNG ou WebP.
                        Máximo de {form.maxFileSizeMB} MB por arquivo.
                      </p>
                      <input
                        ref={input}
                        id="receipts"
                        type="file"
                        multiple
                        accept={acceptedTypes.join(",")}
                        aria-describedby="file-help"
                        onChange={(e) => {
                          addFiles(Array.from(e.target.files || []));
                          e.target.value = "";
                        }}
                      />
                      <ul className={styles.files}>
                        {files.map((file, index) => (
                          <li key={`${file.name}-${index}`}>
                            <span>
                              {file.name} (
                              {(file.size / 1024 / 1024).toFixed(1)} MB)
                            </span>
                            <button
                              type="button"
                              aria-label={`Remover ${file.name}`}
                              onClick={() => {
                                invalidate();
                                setFiles(files.filter((_, i) => i !== index));
                              }}
                            >
                              Remover
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </fieldset>
              {error && (
                <p role="alert" className={styles.error}>
                  {error}
                </p>
              )}
              <button className={styles.button} disabled={busy} type="submit">
                {busy ? "Enviando inscrição…" : "Enviar inscrição"}
              </button>
              <p className={styles.hint}>
                * Campos obrigatórios. O envio não confirma automaticamente o
                pagamento.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
