export interface ResponseRecaptcha{
    action: string,
    challenge_ts: string,
    hostname: string,
    score: number
    success: boolean
}
export interface ProfileProps {
    _id: string
    name: string,
    cargo: string,
    ramo: string, 
    nivelAcess: "Escotista" | "Dirigente" | "Admin"
    token: string,    
    user: string,
    password: string,
    expires?: number,
}

export interface DataNews {
    title: string,
    paragraph: string,
    imageID: string,
    destaque: boolean,
    date: Date,
    evento?: boolean, //se não for evento é notícia.
    linkMaps: string,
    _id: string
}

export interface DataBaseSaae {
    produto: string,
    atividade: string,
    localInicio: Endereco,
    localFim: Endereco,
    partesInteressadas: string[],
    ods: string[],
    abrangencia: {
        inicio: string,
        fim: string
    }
    _id: string
}

export interface Endereco {
    logradouro: string,
    bairro: string,
    municipio: string,
    uf: string,
    cep: string
}

export interface IADataForm{
    atividade: string;
    perigo: string,
    danos: string,
    controleOperacional: string,
    acoesMitigadoras: string,
    probabilidade: number,
    consequencia: number
}
export interface ResponseDataIA {
    atividade: string,
    perigo: string,
    danos: string,
    controleOperacional: string,
    acoesMitigadoras: string,
};
export interface RequestDataIA {
    input: string;
};