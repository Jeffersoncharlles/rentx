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
                <Brand>Audio</Brand>
                <Name>Rs 5 Coupe</Name>
            </Details>
            <About>
                <Rent>
                    <Period>Ao dia</Period>
                    <Price>R$ 120</Price>
                </Rent>

                <Type>
                    <GasolineSvg />
                </Type>
            </About>

            <CarImage source={{uri: ''}} />
        </Container>
    );
}