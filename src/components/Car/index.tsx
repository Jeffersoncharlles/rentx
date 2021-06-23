import React from 'react';
import GasolineSvg from '../../assets/gasoline.svg';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from './styles';

export const Car = () => {
    return (
        <Container>
            <Details>
                <Brand>Audi</Brand>
                <Name>Rs 5 Coupe</Name>
           
                <About>
                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 120</Price>
                    </Rent>

                    <Type>
                        <GasolineSvg />
                    </Type>
                </About>
            </Details>

            <CarImage source={{uri: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red-thumb.png'}} />
        </Container>
    );
}