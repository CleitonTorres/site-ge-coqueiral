declare interface GRecaptcha {
    ready: (cb:()=>void)=> void,
    execute: (secret: string, config:unknown)=>Promise<string>
}
declare const grecaptcha:GRecaptcha;