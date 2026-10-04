import RegistrationFormView from '@/components/form/registration/registrationForm';
export const metadata = {title: 'Inscrições | Grupo Escoteiro Coqueiral'};
export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  return <RegistrationFormView slug={slug} />;
}
