import type { Metadata } from 'next';
import NewsListing from '@/components/layout/newsListing/newsListing';

export const metadata: Metadata = {
    title: 'Aconteceu — Notícias do Coqueiral',
    description: 'Acompanhe as atividades, conquistas e histórias do Grupo Escoteiro Coqueiral.',
    alternates: {canonical: 'https://19.escoteiroses.org.br/aconteceu/'},
};

export default function Page() {
    return <NewsListing />;
}
