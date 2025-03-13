import { DadosGeraisSaae } from "@/@types/types"
import { dateFormat2, dateFormat3 } from "@/scripts/globais"
import styles from './requerimento.module.css';

type Props = {
    localData: DadosGeraisSaae
}
export default function Requerimento({localData}:Props){

    if(!localData) return null;

    return(
        <div className={styles.conteiner}>
            <h4>SOLICITAÇÃO DE AUTORIZAÇÃO DE ATIVIDADE EXTERNA</h4>
            <p>À Direção Regional dos Escoteiros do Brasil – ES</p>
            <p>
                Atendendo à resolução regional 007/2014.  Eu <b>{localData?.coordenador}</b> do <b>{`${localData.dadosUel?.numUel || 'não informado'} ES ${localData.dadosUel?.nameUel || 'não informado'}`}</b>, 
                vem por meio deste solicitar à Direção Regional dos Escoteiros do Brasil – ES a autorização
                para a realização da atividade externa denominada {localData?.nomeAtividade}, 
                que será realizada no dia {dateFormat2(localData?.dataInicio)} e demais informações conforme SAAE anexa. 
            </p>
            <p>
                {`${localData.dadosUel?.cidadeUels || 'Não informado'}, ${dateFormat3(new Date())}`}
            </p>
            <p>
                Coordenador da atividade: {localData?.coordenador || 'não informado'}<br/>
                Registro UEB: {localData?.regCoordenador || 'não informado'}<br/>
                Formação: {localData?.nivelFormacaoCoordenador || 'não informado'}<br/>
                Contato: {localData?.telCoordenador || 'não informado'}<br/>
            </p>
            <p>
                Diretor(a) Presidente: {localData.dadosUel?.presidenteUel || 'não informado'}<br/>
                Registro UEB: {localData.dadosUel?.regEscoteiroPresidente  || 'não informado'}<br/>
                Contato: {localData.dadosUel?.telPresidente || 'não informado'}<br/>
            </p>
        </div>
    )
}