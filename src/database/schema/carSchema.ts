import { tableSchema } from '@nozbe/watermelondb';

//criando a tabela 
//passando nome da tabela
//criando as colunas
const carSchema = tableSchema({
    name:'cars',
    columns: [
        {
        name:'name',
        type: 'string',
        },
        {
        name:'brand',
        type: 'string',
        },
        {
        name:'about',
        type: 'string',
        },
        {
        name:'fuel_type',
        type: 'string',
        },
        {
        name:'period',
        type: 'string',
        },
        {
        name:'price',
        type: 'number',
        },
        {
        name:'thumbnail',
        type: 'string',
        },
    ]
});

export {carSchema}