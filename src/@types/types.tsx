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
    nivelAcess: "Escotista" | "Dirigente" | "Admin" | 'Tester' | 'Regional-admin',
    token?: string,    
    user: string,
    password: string,
    expires?: number,
    dadosUel: DadosUEL
}

export interface DadosUEL {
    presidenteUel: string,
    regEscoteiroPresidente: string,
    telPresidente: string,
    numUel: number,
    nameUel: string,
    cidadeUels: string,
    ufUel: string,
}
export interface DadosBasicosUEL{
    numUel: number,
    nameUel: string,
    cidadeUel: string,
    ufUel: string,
}
export interface DataNews {
    title: string,
    paragraph: string,
    imageID: string[],
    destaque: boolean,
    date: Date,
    evento?: boolean, //se não for evento é notícia.
    linkMaps: string,
    keywords: string[],
    slug: string,
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
    coordenadas?: {lat: number, long: number},
    address?: string
}

export interface DataStorage {
    dataSaae: SAAE,
    user: ProfileProps,
    id?: number | string
}
export interface SAAE {
    grauRisco: GrauRisco,
    infosPreliminares: InfosPreliminaresSaae[],
    dadosGerais: DadosGeraisSaae,
    inventarioRiscos: InventarioSaaeType[],
    planoEmergencia: PlanoEmergenciaSaae,
    fotosInspecao: FormFotosInspecao[],
    documentos: FormDocs[],
    status: string,
    obs?: string,
    _id: string
}

export interface GrauRisco {
    color: 'green' | 'yellow' | 'orange' | 'red' | '',
    value: number
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
    atividadeNaoSupervisionada: 'Sim' | 'Não',
    usoTransporteInterMunicipal: 'Sim' | 'Não',
    ramo: string[],
    gruposConvidados?: DadosBasicosUEL[],
    tipoAtividade: string[],
    odss: string[],
    metodologia: string,
    objetivo: string,
    localInicio: Endereco,
    localFim?: Endereco,
    dataInicio: Date | string,
    dataFim: Date | string,
    horaInicio: string,
    horaFim: string,
    localSaida: string,
    localChegada: string,
    meioTransporte: string,
    custoIndividual: string,
    coordenador: string,
    regCoordenador: string,
    telCoordenador: string,
    emailCoordenador: string,
    nivelFormacaoCoordenador: 'Preliminar' | "Intermediário" | "Avançado",
    temSupervisor: 'Sim' | 'Não',
    regSupervisor?: string,
    nomeSupervisor?: string,
    telSupervisor?: string,
    emailSupervisor?: string,
    nivelFormacaoSupervisor?: string,
    comoChegar: string,
    linkMapa: string,
    rotas?:Rota[],
    programacao: ProgramacaoAtividade[],
    dadosUel: DadosUEL
}
export interface Rota {
    title: string,
    description: string,
    distance: number,
    points: { lat: number, lng: number }[],
    id: string
}
export interface ProgramacaoAtividade {
    data: Date | string,
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
    dataInspecao: Date | string,
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
export interface FormFotosInspecao {
    title: string,
    description: string,
    fotos: FotosInspecaoType[];
}
export interface FormDocs {
    title: string,
    description: string,
    docs: FotosInspecaoType[];
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
    regEscoteiro: string,
    docs: Docs[]
}
export interface AtividadeProfissional {
    nomeProf: string,
    contato: string,
    profissao: string,
    numCarteirinha: string,
    regEscoteiro: string,
    cpf: string,
    redesSociais:  string[],
    docs: Docs[]
}
export interface Docs {
    titulo: string,
    doc: string | File
}
export interface FotosInspecaoType {
    title: string,
    description: string,
    name: string,
    doc: string | File
}
export interface Veiculos {
    nomeMotorista: string,
    tipoVeiculo: string,
    contato: string,
    profissao: string,
    habilitacao: string,
    cpf: string,
    regEscoteiro: string,
    manutencao: 'Sim' | 'Não',
    docs: Docs[]
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