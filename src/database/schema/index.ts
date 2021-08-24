import { appSchema } from '@nozbe/watermelondb';

import { userSchema } from './userSchema';
import { carSchema } from './carSchema';


//importo os schemas e depois passo para ele as tables
// e a versão
//e exporta
const schemas = appSchema({
    version:2,
    tables:[
        userSchema,
        carSchema
    ]
});

export {schemas}