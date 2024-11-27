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
    token: string,    
    user: string,
    password: string,
    expires?: number,
}