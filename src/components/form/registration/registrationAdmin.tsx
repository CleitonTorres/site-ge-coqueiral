"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  DEFAULT_REGISTRATION_DRIVE_ROOT,
  festivalTemplate,
  RegistrationField,
  RegistrationForm,
  validateForm,
} from "@/lib/registrations/model";
import styles from "./styles.module.css";

const cloneTemplate = () => structuredClone(festivalTemplate);

export default function RegistrationAdmin() {
  const [forms, setForms] = useState<RegistrationForm[]>([]);
  const [draft, setDraft] = useState<RegistrationForm | null>(null);
  const [creating, setCreating] = useState(true);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const confirmation = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (message !== "Formulário salvo. O endereço já pode ser compartilhado.")
      return;
    confirmation.current?.focus({ preventScroll: true });
    confirmation.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }, [message]);

  async function load() {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/inscricoes/formularios?admin=1", {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setForms(data.forms);
      setCanEdit(true);
    } catch (error) {
      setCanEdit(false);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function update<K extends keyof RegistrationForm>(
    key: K,
    value: RegistrationForm[K],
  ) {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  async function persist(form: RegistrationForm, create: boolean) {
    validateForm(form);

    const response = await fetch("/api/inscricoes/formularios", {
      method: create ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    setForms((prev) => [
      ...prev.filter((item) => item.slug !== form.slug),
      data.form,
    ]);
    return data.form as RegistrationForm;
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft || busy) return;
    setBusy(true);
    setError("");
    setMessage("");

    try {
      const form = await persist(draft, creating);
      setDraft(form);
      setCreating(false);
      setMessage("Formulário salvo. O endereço já pode ser compartilhado.");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function toggle(form: RegistrationForm) {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const saved = await persist({ ...form, open: !form.open }, false);
      if (draft?.slug === saved.slug) setDraft(saved);
      setMessage(saved.open ? "Inscrições abertas." : "Inscrições fechadas.");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function changeField(index: number, patch: Partial<RegistrationField>) {
    if (draft)
      update(
        "fields",
        draft.fields.map((field, i) =>
          i === index ? { ...field, ...patch } : field,
        ),
      );
  }

  return (
    <section className={styles.page} aria-labelledby="registration-admin-title">
      <div className={styles.panel}>
        <span className={styles.eyebrow}>Atividades do grupo</span>
        <h2 id="registration-admin-title">Formulários de inscrição</h2>
        <p>
          Crie um formulário, configure os kits e compartilhe o endereço. Abra
          ou feche as inscrições quando precisar.
        </p>

        {loading && <p role="status">Carregando formulários…</p>}
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        {message && (
          <p
            ref={confirmation}
            className={`${styles.notice} ${styles.confirmation}`}
            role="status"
            tabIndex={-1}
          >
            {message}
          </p>
        )}
        {!canEdit && !loading && (
          <div className={styles.row}>
            <Link className={styles.button} href="/administrativo">
              Entrar novamente
            </Link>
            <button
              className={`${styles.button} ${styles.secondary}`}
              onClick={() => void load()}
            >
              Recarregar
            </button>
          </div>
        )}

        {canEdit && (
          <>
            <div className={styles.row}>
              <button
                className={styles.button}
                disabled={busy}
                onClick={() => {
                  setDraft({
                    ...cloneTemplate(),
                    slug: "",
                    title: "",
                    description: "",
                    instructions: "",
                    kits: [],
                  });
                  setCreating(true);
                  setError("");
                  setMessage("");
                }}
              >
                Novo formulário
              </button>
              <button
                className={`${styles.button} ${styles.secondary}`}
                disabled={busy}
                onClick={() => {
                  setDraft(cloneTemplate());
                  setCreating(true);
                  setError("");
                  setMessage("");
                }}
              >
                Usar modelo Festival de Pipas
              </button>
              <button
                className={`${styles.button} ${styles.secondary}`}
                disabled={busy}
                onClick={() => {
                  setDraft(null);
                  void load();
                }}
              >
                Atualizar lista
              </button>
            </div>
            {!forms.length && (
              <p>
                Nenhum formulário criado. Comece pelo modelo do Festival de
                Pipas.
              </p>
            )}
            <div className={styles.cards}>
              {forms.map((form) => (
                <article className={styles.card} key={form.slug}>
                  <span className={styles.eyebrow}>
                    {form.open ? "Inscrições abertas" : "Inscrições fechadas"}
                  </span>
                  <h3>{form.title}</h3>
                  <Link href={`/inscricoes/${form.slug}`} target="_blank">
                    /inscricoes/{form.slug}
                  </Link>
                  <div className={styles.row}>
                    <button
                      className={styles.button}
                      disabled={busy}
                      onClick={() => {
                        setDraft(structuredClone(form));
                        setCreating(false);
                        setMessage("");
                        setError("");
                      }}
                    >
                      Configurar
                    </button>
                    <button
                      className={`${styles.button} ${styles.secondary}`}
                      disabled={busy}
                      onClick={() => void toggle(form)}
                    >
                      {form.open ? "Fechar inscrições" : "Abrir inscrições"}
                    </button>
                  </div>
                  {form.driveFolderId && (
                    <a
                      href={`https://drive.google.com/drive/folders/${form.driveFolderId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver inscrições no Drive ↗
                    </a>
                  )}
                </article>
              ))}
            </div>
            {draft && (
              <form className={styles.panel} onSubmit={save} aria-busy={busy}>
                <div className={styles.editorHeading}>
                  <h3>
                    {creating ? "Criar formulário" : "Configurar formulário"}
                  </h3>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.secondary}`}
                    disabled={busy}
                    aria-label="Fechar edição do formulário"
                    onClick={() => setDraft(null)}
                  >
                    Fechar <span aria-hidden="true">×</span>
                  </button>
                </div>
                <fieldset disabled={busy}>
                  <div
                    className={styles.panel}
                    style={{ padding: 0, border: 0 }}
                  >
                    <div className={styles.grid}>
                      <div className={styles.field}>
                        <label htmlFor="form-title">Título *</label>
                        <input
                          id="form-title"
                          required
                          maxLength={200}
                          value={draft.title}
                          onChange={(e) => update("title", e.target.value)}
                        />
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="form-slug">Endereço *</label>
                        <input
                          id="form-slug"
                          required
                          disabled={!creating}
                          maxLength={80}
                          pattern="[a-z0-9]+(-[a-z0-9]+)*"
                          placeholder="festival-de-pipas-2026"
                          value={draft.slug}
                          onChange={(e) => update("slug", e.target.value)}
                        />
                        <p className={styles.hint}>
                          /inscricoes/{draft.slug || "nome-do-formulario"}. O
                          endereço fica fixo depois de criar.
                        </p>
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="form-description">Apresentação</label>
                      <textarea
                        id="form-description"
                        maxLength={5000}
                        value={draft.description}
                        onChange={(e) => update("description", e.target.value)}
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="form-instructions">
                        Orientações e informações de pagamento
                      </label>
                      <textarea
                        id="form-instructions"
                        maxLength={10000}
                        value={draft.instructions}
                        onChange={(e) => update("instructions", e.target.value)}
                      />
                      <p className={styles.hint}>
                        Informe local, horários e instruções de pagamento. Cada
                        quebra de linha será preservada.
                      </p>
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="drive-folder">
                        ID da pasta raiz do Google Drive
                      </label>
                      <input
                        id="drive-folder"
                        placeholder={DEFAULT_REGISTRATION_DRIVE_ROOT}
                        value={draft.driveFolderId}
                        onChange={(e) =>
                          update("driveFolderId", e.target.value.trim())
                        }
                      />
                      <p className={styles.hint}>
                        Padrão: {DEFAULT_REGISTRATION_DRIVE_ROOT}. Deixe vazio
                        para usar o padrão ou informe outra pasta raiz. Cada
                        formulário terá sua própria subpasta. A conta de serviço
                        precisa ter acesso à pasta escolhida.
                      </p>
                    </div>
                    <div className={styles.row}>
                      <label>
                        <input
                          type="checkbox"
                          checked={draft.open}
                          onChange={(e) => update("open", e.target.checked)}
                        />
                        Inscrições abertas
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={draft.filesRequired}
                          onChange={(e) =>
                            update("filesRequired", e.target.checked)
                          }
                        />
                        Comprovante obrigatório
                      </label>
                    </div>
                    <div className={styles.grid}>
                      <div className={styles.field}>
                        <label htmlFor="max-files">Máximo de anexos</label>
                        <input
                          id="max-files"
                          type="number"
                          min={0}
                          max={5}
                          required
                          value={draft.maxFiles}
                          onChange={(e) =>
                            update("maxFiles", Number(e.target.value))
                          }
                        />
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="max-size">
                          Tamanho por arquivo (MB)
                        </label>
                        <input
                          id="max-size"
                          type="number"
                          min={1}
                          max={10}
                          required
                          value={draft.maxFileSizeMB}
                          onChange={(e) =>
                            update("maxFileSizeMB", Number(e.target.value))
                          }
                        />
                      </div>
                    </div>
                    <h3>Campos do formulário</h3>
                    {draft.fields.map((field, index) => (
                      <div className={styles.panel} key={field.id}>
                        <div className={styles.grid}>
                          <div className={styles.field}>
                            <label htmlFor={`label-${field.id}`}>
                              Título do campo *
                            </label>
                            <input
                              id={`label-${field.id}`}
                              required
                              maxLength={200}
                              value={field.label}
                              onChange={(e) =>
                                changeField(index, { label: e.target.value })
                              }
                            />
                          </div>
                          <div className={styles.field}>
                            <label htmlFor={`type-${field.id}`}>Tipo</label>
                            <select
                              id={`type-${field.id}`}
                              value={field.type}
                              onChange={(e) =>
                                changeField(index, {
                                  type: e.target
                                    .value as RegistrationField["type"],
                                })
                              }
                            >
                              <option value="text">Texto curto</option>
                              <option value="email">E-mail</option>
                              <option value="tel">Telefone</option>
                              <option value="textarea">Texto longo</option>
                              <option value="select">Seleção</option>
                            </select>
                          </div>
                        </div>
                        {field.type === "select" && (
                          <div className={styles.field}>
                            <label htmlFor={`options-${field.id}`}>
                              Opções (uma por linha) *
                            </label>
                            <textarea
                              id={`options-${field.id}`}
                              required
                              value={(field.options || []).join("\n")}
                              onChange={(e) =>
                                changeField(index, {
                                  options: e.target.value.split("\n"),
                                })
                              }
                            />
                          </div>
                        )}
                        <div className={styles.row}>
                          <label>
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) =>
                                changeField(index, {
                                  required: e.target.checked,
                                })
                              }
                            />
                            Obrigatório
                          </label>
                          <button
                            type="button"
                            className={`${styles.button} ${styles.secondary}`}
                            disabled={draft.fields.length === 1}
                            onClick={() =>
                              update(
                                "fields",
                                draft.fields.filter((_, i) => i !== index),
                              )
                            }
                          >
                            Remover campo
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className={`${styles.button} ${styles.secondary}`}
                      disabled={draft.fields.length >= 30}
                      onClick={() =>
                        update("fields", [
                          ...draft.fields,
                          {
                            id: `campo-${crypto.randomUUID().slice(0, 8)}`,
                            label: "",
                            type: "text",
                            required: false,
                          },
                        ])
                      }
                    >
                      Adicionar campo
                    </button>
                    <h3>Kits e quantidades</h3>
                    <p className={styles.hint}>
                      O participante informa a quantidade de cada item. Sem
                      kits, o formulário não calcula valores.
                    </p>
                    {draft.kits.map((kit, index) => {
                      const patch = (value: Partial<typeof kit>) =>
                        update(
                          "kits",
                          draft.kits.map((item, i) =>
                            i === index ? { ...item, ...value } : item,
                          ),
                        );
                      return (
                        <div className={styles.panel} key={kit.id}>
                          <div className={styles.field}>
                            <label htmlFor={`name-${kit.id}`}>
                              Nome do kit *
                            </label>
                            <input
                              id={`name-${kit.id}`}
                              required
                              maxLength={200}
                              value={kit.name}
                              onChange={(e) => patch({ name: e.target.value })}
                            />
                          </div>
                          <div className={styles.field}>
                            <label htmlFor={`description-${kit.id}`}>
                              Descrição
                            </label>
                            <textarea
                              id={`description-${kit.id}`}
                              maxLength={1000}
                              value={kit.description}
                              onChange={(e) =>
                                patch({ description: e.target.value })
                              }
                            />
                          </div>
                          <div className={styles.grid}>
                            <div className={styles.field}>
                              <label htmlFor={`price-${kit.id}`}>
                                Preço unitário (R$) *
                              </label>
                              <input
                                id={`price-${kit.id}`}
                                type="number"
                                min={0}
                                max={100000}
                                step="0.01"
                                required
                                value={kit.priceCents / 100}
                                onChange={(e) =>
                                  patch({
                                    priceCents: Math.round(
                                      Number(e.target.value) * 100,
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className={styles.field}>
                              <label htmlFor={`limit-${kit.id}`}>
                                Quantidade máxima por inscrição
                              </label>
                              <input
                                id={`limit-${kit.id}`}
                                type="number"
                                min={1}
                                max={100}
                                required
                                value={kit.maxQuantity}
                                onChange={(e) =>
                                  patch({ maxQuantity: Number(e.target.value) })
                                }
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            className={`${styles.button} ${styles.secondary}`}
                            onClick={() =>
                              update(
                                "kits",
                                draft.kits.filter((_, i) => i !== index),
                              )
                            }
                          >
                            Remover kit
                          </button>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      className={`${styles.button} ${styles.secondary}`}
                      disabled={draft.kits.length >= 30}
                      onClick={() =>
                        update("kits", [
                          ...draft.kits,
                          {
                            id: `kit-${crypto.randomUUID().slice(0, 8)}`,
                            name: "",
                            description: "",
                            priceCents: 0,
                            maxQuantity: 100,
                          },
                        ])
                      }
                    >
                      Adicionar kit
                    </button>
                  </div>
                </fieldset>
                <div className={styles.row}>
                  <button
                    className={styles.button}
                    type="submit"
                    disabled={busy}
                  >
                    {busy ? "Salvando…" : "Salvar formulário"}
                  </button>

                  <button
                    type="button"
                    className={`${styles.button} ${styles.secondary}`}
                    disabled={busy}
                    onClick={() => setDraft(null)}
                  >
                    Cancelar
                  </button>

                  {!creating && (
                    <Link href={`/inscricoes/${draft.slug}`}>
                      Ver formulário →
                    </Link>
                  )}
                </div>
                <p className={styles.hint}>
                  Mudanças só entram em vigor ao salvar. Inscrições já recebidas
                  preservam os campos, kits e preços usados no envio.
                </p>
              </form>
            )}
          </>
        )}
      </div>
    </section>
  );
}
