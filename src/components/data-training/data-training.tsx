import { DataBaseSaae, ProfileProps } from "@/@types/types"

export const userTest = [
    {
        _id: '001',
        cargo: 'Tester',
        email: 'emailtester@gmail.com',
        name: 'Tester Gusmão',
        nivelAcess: 'Tester',
        nivelFormacao: 'Preliminar',
        password: `${process.env.NEXT_PUBLIC_PASSWORD}`,
        ramo: 'Sênior',
        registro: '0019',
        tel: '27 6563-2522',
        user: 'tester'
    } as ProfileProps,
    {
        _id: '002',
        cargo: 'Coordenador',
        email: 'emailtester@gmail.com',
        name: 'Tester Gusmão',
        nivelAcess: 'Regional-admin',
        nivelFormacao: 'Preliminar',
        password: `${process.env.NEXT_PUBLIC_PASSWORD}`,
        ramo: 'Diretoria',
        registro: '0019',
        tel: '27 6563-2522',
        user: 'tester-admin'
    } as ProfileProps
];

interface DataTypeIA {
    input: string,
    response: [
        {[key:string]: string}
    ]
}
export const data:Array<DataTypeIA> = [
    {
        input: "remada em caiaque?", 
        response: [{
                perigo: 'insolação',
                danos: 'fraqueza, palidez, respiração acelerada, desmaio, convulsões e coma. ',
                controleOperacional: 'usar roupas leves e que oferecam certa proteção UV, usar cobertura de cabeça e se hidratar',
                acoesMitigadoras: 'em casos mais graves retirar o participante da atividade, direcionar para uma Unidade de Saúde, em casos mais leves oferecer repouso sombreado, hidratação lenta, ofereçer compressa de pano frio(água temperatura natural).'
            }
        ]
    },
]
export const tiposAtividade = [
    'Acampamento',
    'Acampamento na floresta',
    'Acampamento ambiente urbano',
    'Acantonamento urbano',
    'Acantonamento rural',
    'Bivaque em floresta',
    'Bivaque em ambiente rural',
    'Bivaque em ambiente urbano',
    'Caminhada urbana',
    'Caminhada na floresta',
    'Caminhada em ambiente rural'
]
export const Odss = [
    '1. Erradicação da pobreza',
    '2. Erradicação da fome',
    '3. Saúde e Bem-Estar',
    '4. Educação de qualidade',
    '5. Igualdade de gênero',
    '6. Água Potável e Saneamento',
    '7. Energia acessível e limpa',
    '8. Trabalho decente e crescimento econômico',
    '9. Inovação e infraestrutura',
    '10. Redução das desigualdades',
    '11. Cidades e comunidades sustentáveis',
    '12. Consumo e produção responsáveis',
    '13. Ação contra a Mudança Global do Clima',
    '14. Vida na Água',
    '15. Vida Terrestre',
    '16. Paz, Justiça e Instituições Eficazes',
    '17. Parcerias e Meios de Implementação'
]

export const dataBaseSaae:DataBaseSaae[] = [
    {
        produto: 'Trilha dos Camarás',
        atividade: ['Caminhada'],
        localInicio:{
            logradouro: 'Av. dos Vinhaticos, S/N',
            bairro: 'Coqueiral',
            municipio: "Aracruz",
            uf: 'ES',
            cep: '29199053'
        },
        partesInteressadas:['Membros juvenis', 'pais', 'responsáveis', 'escotistas', 'diretoria local'],
        ods:['4. Educação de qualidade'],
        abrangencia:{
            inicio: 'Sede da UEL',
            fim: 'Sede da UEL'
        },
        _id: '000'
    },
    {
        produto: 'Dia de aventura no Parque do Gruta da Onça x Fonte Grande',
        atividade: ['Caminhada', 'Observação de aves'],
        localInicio:{
            logradouro: 'Rua Barão de Monjardim, S/N, Parque Gruta da Onça.',
            bairro: 'Centro',
            municipio: "Vitória",
            uf: 'ES',
            cep: '29010390'
        },
        localFim:{
            logradouro: 'Avenida Serafim Derenz, S/N',
            bairro: 'Grande Vitória',
            municipio: "Vítoria",
            uf: 'ES',
            cep: '29031-800'
        },
        partesInteressadas:['Membros juvenis', 'pais', 'responsáveis', 'escotistas', 'diretoria local', 'administrção do parque'],
        ods:['3. Saúde e Bem-Estar', '4. Educação de qualidade', '15. Vida Terrestre'],
        abrangencia:{
            inicio: 'Portaria do Parque Gruta da Onça',
            fim: 'Sede do Parque Fonte Grande'
        },
        _id: '001'
    }
]