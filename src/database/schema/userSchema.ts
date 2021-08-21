import { tableSchema } from '@nozbe/watermelondb';

//criando a tabela 
//passando nome da tabela
//criando as colunas
const userSchema = tableSchema({
    name:'users',
    columns: [
        {
        name:'user_id',
        type: 'string',
        },
        {
        name:'name',
        type: 'string',
        },
        {
        name:'email',
        type: 'string',
        },
        {
        name:'driver_license',
        type: 'string',
        },
        {
        name:'avatar',
        type: 'string',
        },
        {
        name:'token',
        type: 'string',
        },
    ]
});

export {userSchema}