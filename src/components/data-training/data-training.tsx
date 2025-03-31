import { Atividade, DadosBasicosUEL, DataBaseSaae, ProfileProps } from "@/@types/types"

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
        user: 'tester',
        dadosUel: {
            nameUel: 'Grupo Escoteiro Coqueiral',
            numUel: 19,
            cidadeUels: 'Aracruz',
            ufUel: 'ES',
            presidenteUel: 'Rubia Veiga Ribeiro Machado',
            regEscoteiroPresidente: '1322446-8',
            telPresidente: '27 99736-4409'
        }
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
        user: 'tester-admin',
        dadosUel: {
            nameUel: 'Grupo Escoteiro Coqueiral',
            numUel: 19,
            cidadeUels: 'Aracruz',
            ufUel: 'ES',
            presidenteUel: 'Rubia Veiga Ribeiro Machado',
            regEscoteiroPresidente: '1322446-8',
            telPresidente: '27 99736-4409'
        }
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
export const uels:DadosBasicosUEL[] = [
    {
        numUel: 6,
        nameUel: 'Grupo Escoteiro Baden-Powell',
        cidadeUel: 'Cachoeiro de Itapemirim',
        ufUel: 'ES'
    },
    {
        numUel: 8,
        nameUel: 'Grupo Escoteiro Pedro Nolasco',
        cidadeUel: 'João Neiva',
        ufUel: 'ES'
    },
    {
        numUel: 11,
        nameUel: 'Grupo Escoteiro do Mar Ilha de Vitória',
        cidadeUel: 'Vitória',
        ufUel: 'ES'
    },
    {
        numUel: 12,
        nameUel: 'Grupo Escoteiro Marista',
        cidadeUel: 'Colatina',
        ufUel: 'ES'
    },
    {
        numUel: 16,
        nameUel: 'Grupo Escoteiro Barão de Teffé',
        cidadeUel: 'Vila Velha',
        ufUel: 'ES'
    },
    {
        numUel: 17,
        nameUel: 'Grupo Escoteiro Cidade das Cachoeiras',
        cidadeUel: 'Afonso Cláudio',
        ufUel: 'ES'
    },
    {
        numUel: 19,
        nameUel: 'Grupo Escoteiro Coqueiral',
        cidadeUel: 'Aracruz',
        ufUel: 'ES'
    },
    {
        numUel: 21,
        nameUel: 'Grupo Escoteiro Guarany',
        cidadeUel: 'Pinheiros',
        ufUel: 'ES'
    },
    {
        numUel: 23,
        nameUel: 'Grupo Escoteiro Nhambu Ecoporanga',
        cidadeUel: 'Ecoporanga',
        ufUel: 'ES'
    },
    {
        numUel: 25,
        nameUel: 'Grupo Escoteiro Jequitibá',
        cidadeUel: 'Aracruz',
        ufUel: 'ES'
    },
    {
        numUel: 34,
        nameUel: 'Grupo Escoteiro Mimoso do Sul',
        cidadeUel: 'Mimoso do Sul',
        ufUel: 'ES'
    },    
    {
        numUel: 35,
        nameUel: 'Grupo Escoteiro Linhares',
        cidadeUel: 'Linhares',
        ufUel: 'ES'
    },
    {
        numUel: 47,
        nameUel: 'Grupo Escoteiro do Ar Agnes Baden-Powell',
        cidadeUel: 'São Mateus',
        ufUel: 'ES'
    },
    {
        numUel: 48,
        nameUel: 'Grupo Escoteiro Itabira',
        cidadeUel: 'Itabira',
        ufUel: 'ES'
    },
]
export const atividades:Atividade[] = [
    {
        tipo: "Caminhada em ambiente urbano",
        descricao: "Caminhada em áreas pavimentadas, como calçadas, parques urbanos e ruas seguras.",
        grauRisco: {
            color: "green",
            value: 3
        }
    },
    {
        tipo: "Caminhada em ambiente rural",
        descricao: "Caminhada em estradas de terra, trilhas abertas e terrenos levemente irregulares.",
        grauRisco: {
            color: "yellow",
            value: 5
        }
    },
    {
        tipo: "Caminhada em ambiente natural",
        descricao: "Caminhada em trilhas fechadas, com obstáculos naturais e possível travessia de rios.",
        grauRisco: {
            color: "orange",
            value: 10
        }
    },
    {
        tipo: "Rapel até 15m",
        descricao: "Descida controlada em paredões de até 15 metros, com equipamentos adequados e supervisão.",
        grauRisco: {
            color: "yellow",
            value: 6
        }
    },
    {
        tipo: "Rapel até 30m",
        descricao: "Descida controlada em paredões de até 30 metros, exigindo mais experiência e técnica.",
        grauRisco: {
            color: "orange",
            value: 10
        }
    },
    {
        tipo: "Rapel até 60m",
        descricao: "Descida em paredões de até 60 metros, necessitando equipamentos avançados e treinamento.",
        grauRisco: {
            color: "red",
            value: 15
        }
    },
    {
        tipo: "Rapel até 100m",
        descricao: "Descida em paredões acima de 60 metros, com alto risco e necessidade de técnicas especializadas.",
        grauRisco: {
            color: "red",
            value: 20
        }
    },
    {
        tipo: "Escalada artificial até 5m",
        descricao: "Escalada em paredes artificiais de até 5 metros, com equipamentos de segurança.",
        grauRisco: {
            color: "green",
            value: 3
        }
    },
    {
        tipo: "Escalada artificial até 20m",
        descricao: "Escalada em paredes artificiais de até 20 metros, exigindo técnicas básicas.",
        grauRisco: {
            color: "yellow",
            value: 6
        }
    },
    {
        tipo: "Escalada em ambiente natural até 20m",
        descricao: "Escalada em rochas naturais de até 20 metros, com riscos adicionais devido ao ambiente.",
        grauRisco: {
            color: "orange",
            value: 10
        }
    },
    {
        tipo: "Natação em piscina",
        descricao: "Natação em piscina com profundidade controlada e supervisão.",
        grauRisco: {
            color: "green",
            value: 3
        }
    },
    {
        tipo: "Natação em lago ou rio",
        descricao: "Natação em águas naturais com correnteza leve e profundidade moderada.",
        grauRisco: {
            color: "yellow",
            value: 5
        }
    },
    {
        tipo: "Natação em mar aberto",
        descricao: "Natação em mar aberto, sujeito a correntes marítimas e condições imprevisíveis.",
        grauRisco: {
            color: "orange",
            value: 10
        }
    },
    {
        tipo: "Banho de rio",
        descricao: "Atividade recreativa em rios de correnteza fraca, com águas rasas.",
        grauRisco: {
            color: "yellow",
            value: 4
        }
    },
    {
        tipo: "Banho de cachoeira rasa",
        descricao: "Banho em cachoeira com águas rasas e pouco fluxo.",
        grauRisco: {
            color: "yellow",
            value: 5
        }
    },
    {
        tipo: "Banho de cachoeira profunda",
        descricao: "Banho em cachoeira com águas profundas e forte fluxo de água.",
        grauRisco: {
            color: "orange",
            value: 10
        }
    },
    {
        tipo: "Remada em lago",
        descricao: "Remada em lagoas ou lagos calmos, com uso de caiaques ou canoas.",
        grauRisco: {
            color: "yellow",
            value: 6
        }
    },
    {
        tipo: "Remada em rio",
        descricao: "Remada em rios com correnteza moderada, exigindo experiência básica.",
        grauRisco: {
            color: "orange",
            value: 10
        }
    },
    {
        tipo: "Navegação a vela",
        descricao: "Atividade de navegação em barcos à vela em lagos ou mares calmos.",
        grauRisco: {
            color: "yellow",
            value: 6
        }
    },
    {
        tipo: "Navegação em barco até 5m",
        descricao: "Navegação em pequenos barcos a motor ou remo, exigindo medidas de segurança.",
        grauRisco: {
            color: "orange",
            value: 8
        }
    },
    {
        tipo: "Jogos escoteiros em ambiente urbano",
        descricao: "Atividades recreativas e de orientação em áreas urbanas.",
        grauRisco: {
            color: "green",
            value: 2
        }
    },
    {
        tipo: "Jogos escoteiros na praia, sem banho de mar",
        descricao: "Atividades recreativas em ambiente de praia, com risco de exposição ao sol.",
        grauRisco: {
            color: "yellow",
            value: 5
        }
    },
    {
        tipo: "Jogos escoteiros na praia, com banho de mar",
        descricao: "Atividades recreativas em ambiente de praia, com riscos de afogamento e exposição ao sol.",
        grauRisco: {
            color: "yellow",
            value: 5
        }
    }
];

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