import { emailLayout, emailDataRows, escapeEmail } from './layout';
import { DadosBasicosUEL } from "@/@types/types";

export type EmailBody={
    body: BodyEmail
}

export interface BodyEmail {
  user:{
      name: string;
      email: string;
      dadosBasicosUels: DadosBasicosUEL,
      _id: string;
  },
  saae:{
      name: string;
      dataInicio: string;
      dataFim: string;
      local: string;
      status: string;
      _id: string;
  }
}

/**
 * Converte o objeto com dados do email para uma string html.
 * @param {EmailBody} body - objeto com os dados do corpo do email. 
 */
export function newSAAEEmail ({body}:EmailBody) {
  const uel = body.user.dadosBasicosUels;
  const html = emailLayout({
    title: 'Nova solicitação de atividade externa',
    preview: `${body.saae.name} · ${body.user.name}`,
    content: `<p>Uma nova solicitação foi enviada por <strong>${escapeEmail(body.user.name)}</strong>.</p>
      <p style="padding:16px;background:#eef2df">${escapeEmail(uel.numUel)} ${escapeEmail(uel.ufUel)} · ${escapeEmail(uel.nameUel)}</p>
      ${emailDataRows([['Atividade', body.saae.name], ['Período', `${body.saae.dataInicio} até ${body.saae.dataFim}`], ['Local', body.saae.local], ['Status', body.saae.status], ['Identificador da SAAE', body.saae._id], ['Contato do solicitante', body.user.email]])}
      <p style="font-size:14px;color:#596577">Confira os dados da atividade e dê continuidade à análise da solicitação.</p>`,
  });
    return html;
}