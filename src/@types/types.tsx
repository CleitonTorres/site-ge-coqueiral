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
    nivelFormacao: string,
    registro: string,
    tel: string,
    email: string, 
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
    atividade: string[],
    produto: string,
    localInicio: Endereco,
    localFim?: Endereco,
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
    cep: string,
    coordenadas?: {lat: number, long: number}
}

export interface SAAE {
    infosPreliminares: InfosPreliminaresSaae[],
    dadosGerais: DadosGeraisSaae,
    inventarioRiscos: InventarioSaaeType[],
    planoEmergencia: PlanoEmergenciaSaae
}

export interface InventarioSaaeType{
    atividade: string;
    perigo: string,
    danos: string,
    controleOperacional: string,
    acoesMitigadoras: string,
    probabilidade: number,
    consequencia: number,
    nivelRisco: number
}
export interface InfosPreliminaresSaae {
    item: string,
    text: string
}
export interface DadosGeraisSaae {
    nomeAtividade: string,
    tipoAtividade: string[],
    odss: string[],
    metodologia: string,
    objetivo: string,
    localInicio: Endereco,
    localFim?: Endereco,
    dataInicio: Date,
    dataFim: Date,
    horaInicio: string,
    horaFim: string,
    localSaida: string,
    localChegada: string,
    meioTransporte: string,
    custoIndividual: string,
    cienciaInfosPreliminares: 'Sim' | 'Não'
    coordenador: string,
    regCoordenador: string,
    telCoordenador: string,
    emailCoordenador: string,
    nivelFormacaoCoordenador: 'Preliminar' | "Intermediário" | "Avançado",
    temSupervisor: 'Sim' | 'Não',
    regSupervisor?: string,
    nomeSupervisor?: string,
    telSupervisor?: string,
    nivelFormacaoSupervisor?: string,
    comoChegar: string,
    linkMapa: string,
    programacao: ProgramacaoAtividade[]
}
export interface ProgramacaoAtividade {
    data: Date,
    hora: string,
    duracao: string,
    descricao: string,
    materialNecessario: string,
    responsavel: string
    id: number
}
export interface PlanoEmergenciaSaae {
    localInicio: Endereco,
    localFim?: Endereco,
    fichaMedicaRevisada: 'Sim' | 'Não',
    kitPrimeirosSocorros: 'Sim' | 'Não',
    inspesaoLocal: 'Sim' | 'Não',
    dataInspecao: Date,
    prontoSocorro: {
        nome: string,
        local: string,
        distancia: string,
        contato: string
    },
    hospital: {
        nome: string,
        local: string,
        distancia: string,
        contato: string
    },
    contatosEmergencia: ContatosEmergencia[],
    espacosSeguros: {
        infosPreliminares: 'Sim' | 'Não',
        infosMedicas: 'Sim' | 'Não',
        protecaoDados: 'Sim' | 'Não',
        cursosEscotistas: 'Sim' | 'Não',
        canalDenuncias: 'Sim' | 'Não',
        acolhimento: Profissional[],
        enfermaria: Profissional[],
    }
    veiculos: Veiculos[],
    atividadePorProfissional: AtividadeProfissional[]
    profSalvamento: Profissional[]
}

export interface ContatosEmergencia{
    nome: string,
    contato: string
}
export interface Profissional{
    nome: string,
    contato: string,
    profissao: string,
    numCarteirinhaClass: string,
    cpf: string,
    regEscoteiro: string
}
export interface Veiculos {
    nomeMotorista: string,
    tipoVeiculo: string,
    contato: string,
    profissao: string,
    habilitacao: string,
    cpf: string,
    regEscoteiro: string,
    manutencao: 'Sim' | 'Não'
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
export interface AtividadeProfissional {
    nomeProf: string,
    contato: string,
    profissao: string,
    numCarteirinha: string,
    regEscoteiro: string,
    cpf: string,
    redesSociais:  string[],
}
export interface CEP{
    bairro: string,
    cep: string,
    complemento: string,
    ddd: string,
    gia: string,
    ibge: string,
    localidade: string,
    logradouro: string,
    siafi: string,
    uf: string
}