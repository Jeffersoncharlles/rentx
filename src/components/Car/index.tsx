import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import CarDTO from '../../dtos/CarDTO';
import { getAccessoriesIcon } from '../../utils/getAccessoriesIcon';
import { Car as ModelCar } from '../../database/model/car';

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
import { useNetInfo } from '@react-native-community/netinfo';

interface Props extends RectButtonProps {
    data:  ModelCar;
}

export const Car = ({data, ...rest}: Props) => {
    const MotorIcon = getAccessoriesIcon(data.fuel_type);
    const netInfo = useNetInfo();



    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>
           
                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>{`R$ ${netInfo.isConnected === true? data.price : '...'}`}</Price>
                    </Rent>

                    <Type>
                        <MotorIcon />
                    </Type>
                </About>
            </Details>

            <CarImage  
                source={{uri: data.thumbnail }} 
                resizeMode="cover"
            />
        </Container>
    );
}