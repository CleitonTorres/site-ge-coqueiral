import RegistrationFormView from '@/components/form/registration/registrationForm';
export const metadata = {
  title: 'Inscrições | Grupo Escoteiro Coqueiral',
  description: 'Página de inscrições do Grupo Escoteiro Coqueiral. Preencha o formulário para se inscrever em nossos eventos e atividades comunitárias/escoteiras.',
  openGraph: {
      title: 'Inscrições | Grupo Escoteiro Coqueiral',
      description: 'Página de inscrições do Grupo Escoteiro Coqueiral. Preencha o formulário para se inscrever em nossos eventos e atividades comunitárias/escoteiras.',
      images: [{ 
        url: 'https://19.escoteiroses.org.br/images/foto01.jpeg',
        width: 800,
        height: 600,
        alt: 'Inscrições | Grupo Escoteiro Coqueiral'
      }],
      url: 'https://19.escoteiroses.org.br/inscricoes',
  }
};

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  return <RegistrationFormView slug={slug} />;
}
