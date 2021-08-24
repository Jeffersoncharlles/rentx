import { Model } from "@nozbe/watermelondb";
import {field} from '@nozbe/watermelondb/decorators';

//importar o model
//importar o field para representar cada campo que vai existir dentro da model

//@field colocar qualquer e o nome do campo que vai ficar na tabela
//a ! e para nao da erro alem de mudar no tsconfig
class Car extends Model {
    static table = 'cars'

    @field('name')
    name!: string;

    @field('brand')
    brand!: string;

    @field('about')
    about!: string;

    @field('fuel_type')
    fuel_type!: string;

    @field('period')
    period!: string;

    @field('price')
    price!: number;

    @field('thumbnail')
    thumbnail!: string;

}

export { Car } 