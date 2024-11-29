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
    urlLink: string,
    destaque: boolean,
    _id: string
}