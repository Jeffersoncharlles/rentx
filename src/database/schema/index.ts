import { appSchema } from '@nozbe/watermelondb';

import { userSchema } from './userSchema';


//importo os schemas e depois passo para ele as tables
// e a versão
//e exporta
const schemas = appSchema({
    version:1,
    tables:[
        userSchema
    ]
});

export {schemas}