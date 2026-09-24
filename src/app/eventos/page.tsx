import type { Metadata } from 'next';
import NewsListing from '@/components/layout/newsListing/newsListing';

export const metadata: Metadata = {
    title: 'Eventos do Coqueiral',
    description: 'Acompanhe os eventos do Grupo Escoteiro Coqueiral.',
    alternates: {canonical: 'https://19.escoteiroses.org.br/eventos/'},
};

export default function Page() {
    return <NewsListing events />;
}
