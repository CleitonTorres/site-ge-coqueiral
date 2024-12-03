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
                danos: 'fraqueza, palidez, respiração acelerada, desmaio, convulsões e coma. '
            }
        ]
    },
]