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