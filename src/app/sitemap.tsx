
import { MetadataRoute } from 'next';
import axios from 'axios';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL || "https://19.escoteiroses.org.br";

    console.log("Gerando sitemap...", baseUrl);
    try {
        // Busca todas as notícias da API
        const response = await axios.get(`${baseUrl}${process.env.NEXT_PUBLIC_URL_SERVICES}`, {
            params: { service: 'news' },
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTORIZATION}`
            }
        });

        const noticias = response.data.news || [];

        // Gera os links dinâmicos das notícias
        const noticiasUrls = noticias.map((noticia: { slug: string; date: string }) => {
            const dataValida = noticia.date ? new Date(noticia.date) : null;
            return {
                url: `${baseUrl}/aconteceu/${noticia.slug}`,
                lastModified: dataValida instanceof Date && !isNaN(dataValida.getTime()) 
                    ? dataValida.toISOString() 
                    : new Date().toISOString(), // Usa a data atual como fallback
            };
        });

        // Adiciona páginas fixas do site
        return [
            { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/sobre`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/contato`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/campo-escola`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/ciclo-vida`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/como-abrir-uma-uel`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/conselhos`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/contatos`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/coqueiral`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/diretoria`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/doe`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/edu-escoteira`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/empresa-parceira`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/escoteiro-dev`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/escoteiros-do-brasil`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/escotismo-ods`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/espacos-seguros`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/eventos`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/galeria-fotos`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/governanca`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/metodo-escoteiro`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/mutcom`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/muteco`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/noticias`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/progressao`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/projeto-educativo`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/protecao-infantojuvenil`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/ramo-escoteiro`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/ramo-lobinho`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/ramo-senior`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/seja-escoteiro`, lastModified: new Date().toISOString() },
            { url: `${baseUrl}/tribo-da-terra`, lastModified: new Date().toISOString() },
            ...noticiasUrls,
        ];
    } catch (error) {
        console.error("Erro ao gerar sitemap:", error);
        return [];
    }
}
