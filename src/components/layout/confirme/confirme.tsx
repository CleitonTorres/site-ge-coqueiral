import { useContext, useState } from "react";
import Mathias from "../mathias/mathias"
import styles from './confirme.module.css';
import LoadIcon from "../loadIcon/loadIcon";
import { Context } from "@/components/context/context";

type Props = {
    message: string,
    confirme: ()=>Promise<{
        bool: boolean | undefined,
        text: string
    }>,
    cancele?: ()=>void
}
export default function Confirme ({message, cancele, confirme}:Props){
    const context = useContext(Context);
    const [loading, setLoading] = useState<boolean | undefined>();
    const [textMathias, setTextMathias] = useState(message);

    return(
        <div className={styles.conteiner}>
            <Mathias show text={textMathias} customClass={['center']}/>
            <button 
                onClick={async()=>{

                    if(loading === undefined){
                        setLoading(true);

                        const resp = await confirme();
                        setTextMathias(resp.text);

                        setLoading(resp.bool === undefined ? undefined : false);
                    }else{
                        
                        if(!loading) context.setShowModal(null);
                    }
                }
            }>
                {!loading ? 'Ok' : <LoadIcon showHide customClass="size30"/>}
            </button>
            {loading === undefined ? <button onClick={cancele}>Cancelar</button> :null}
        </div>
    )
}