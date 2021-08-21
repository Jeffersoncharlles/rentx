import { Model } from "@nozbe/watermelondb";
import {field} from '@nozbe/watermelondb/decorators';

//importar o model
//importar o field para representar cada campo que vai existir dentro da model

//@field colocar qualquer e o nome do campo que vai ficar na tabela
//a ! e para nao da erro alem de mudar no tsconfig
class User extends Model {
    static table = 'users'

    @field('user_id')
    user_id!: string;

    @field('name')
    name!: string;

    @field('email')
    email!: string;

    @field('driver_license')
    driver_license!: string;

    @field('avatar')
    avatar!: string;

    @field('token')
    token!: string;

}

export { User } 