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
  const html = `
  <div>
      <h1>Uma nova solicitação de atividade externa chegou</h1>
      <div>
          <span>
            Chegou uma solicitação uma nova solicitação de serviço de 
            <strong>${body.user.name}</strong> do ${body.user.dadosBasicosUels.numUel} ${body.user.dadosBasicosUels.ufUel} ${body.user.dadosBasicosUels.nameUel}.
            </span><br/>
          <span>
            <b style={{marginRight: "3px"}}>dados da solicitação:</b>
          </span><br/>
          <span>
            <b style={{marginRight: "3px"}}>Data da atividade:</b> 
            ${body.saae.dataInicio} até ${body.saae.dataFim}
          </span><br/>
          <span>
            <b style={{marginRight: "3px"}}>Local:</b> 
            ${body.saae.local}
          </span><br/>
          <span>
            <b style={{marginRight: "3px"}}>Status da SAAE:</b> 
            ${body.saae.status}
          </span><br/>
          <span>
            <b style={{marginRight: "3px"}}>ID da SAAE:</b> 
            ${body.saae._id} 
          </span><br/>
      </div>
    </div>`

    return html;
}