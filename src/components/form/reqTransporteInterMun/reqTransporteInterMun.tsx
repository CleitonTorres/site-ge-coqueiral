import { DadosGeraisSaae } from "@/@types/types"
import { dateFormat3 } from "@/scripts/globais"
import styles from './reqTransporteInterMun.module.css';

type Props = {
    localData: DadosGeraisSaae
}
export default function RequerimentoTransInterMun({localData}:Props){

    if(!localData) return null;

    return(
        <div className={styles.conteiner}>
            <h6 style={{textAlign: 'center'}}>Resolução CNJ nº 295, de 13 de setembro de 2019.</h6>
            <h4>AUTORIZAÇÃO DE VIAGEM INTERMUNICIPAL</h4>
            <h6 style={{textAlign: 'center'}}>(PARA MENOR DE 16 ANOS ACOMPANHADO – AUTORIZADO POR UM RESPONSÁVEL)</h6>

            <p>Esta Autorização de Viagem é válida até _____/_____/______.</p>
            <p>
                Eu,_____________________________________________________, cédula de identidade nº __________________________, expedida pela ______________, na data de _____/_____/______,<br/>
                CPF nº ___________________________,<br/>
                endereço de domicílio _____________________________________________________________________________________,<br/>
                cidade ______________________________________, <br/>
                UF ___________, <br/>
                telefone de contato ( ____ ) ___________________, <br/>
                na qualidade de ( __ ) mãe      ( __ ) pai      ( __ ) tutor(a)     ( __ ) guardiã(o)
            </p>

            <p style={{textAlign: 'center', fontWeight: 700}}>AUTORIZO a circular livremente, dentro do território nacional,</p>
            
            <p>
                _________________________________________________________________, nascido(a) em _____/_____/______,<br/>
                natural de _________________________________, <br/>
                cédula de identidade nº __________________________, expedida pela ______________, na data de _____/_____/______,<br/> 
                CPF nº ___________________________, <br/>
                endereço de domicílio ______________________________________________________________________________________,<br/> 
                cidade ______________________________________, <br/>
                UF ___________.
            </p>

            <p style={{textAlign: 'center', fontWeight: 700}}>DESDE QUE ACOMPANHADA(O) DE</p>

            <p>
                ___________________________________________________________________, 
                cédula de identidade nº __________________________, expedida pela ______________, na data de _____/_____/______, 
                CPF nº ___________________________, 
                endereço de domicílio _____________________________________________________________________________________, 
                cidade ______________________________________, 
                UF ___________, 
                telefone de contato ( ____ ) ___________________,
            </p>
            <p>
                {`${localData.dadosUel?.cidadeUels || 'Não informado'}, ${dateFormat3(new Date())}`}
            </p>

            <p>
                Responsável legal: ______________________________________________<br/> 
            </p>
            <h6>(Reconhecer firma)</h6>
        </div>
    )
}