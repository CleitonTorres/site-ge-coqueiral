'use client';
import { Feedbacks } from "@/@types/types";
import FeedbackForm from "@/components/form/formFeedbacks/formFeedbacks";
import Section from "@/components/layout/sections/section";
import axios from "axios";
import { useParams } from "next/navigation";

// type PageProps = {
//     params: Promise<{ idSaae: string }>;
// };

export default function Page(){
    //const idSaae = (await (params)).idSaae;
    const params = useParams();
    const idSaae = params?.idSaae as string;

    const onSubmit = async (data: Feedbacks):Promise<boolean> => {
        console.log(data);
        try {
            const resp = await axios.post(`${process.env.NEXT_PUBLIC_URL_SERVICES}`, {
                data,
                service: 'saveFeedback',
                idSaae: idSaae,
            }, {
                headers:{
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
                }
            });

            if(resp.status === 200){
                alert('Feedback enviado com sucesso!');
                console.log(resp.data);
                return true;
            }else{
                throw new Error('Erro ao enviar o feedback');
            }
        }catch (error) {
            console.error(error);
            alert('Erro ao enviar o feedback');
            return true;
        }
    };

    if(!idSaae) return <p>sem formulário para responder!</p>;

    return(
        <Section customClass={['fullWidth', 'margin0']}>
            <FeedbackForm idSaae={idSaae} onSubmit={onSubmit}/>
        </Section>
    )
}