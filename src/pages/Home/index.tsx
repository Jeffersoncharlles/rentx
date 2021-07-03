import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import {Car} from '../../components/Car';

import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CarList
} from './styles';

export const Home = () => {
    const navigation = useNavigation();

    const carData = {
        brand: 'audi',
        name: 'RS 5 Coupe',
        rent: {
            period: 'ao dia',
            price: 120,
        },
        thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red-thumb.png',
    }
    const carData2 = {
        brand: 'Porsche',
        name: 'Panamera',
        rent: {
            period: 'ao dia',
            price: 340,
        },
        thumbnail: 'https://freepngimg.com/thumb/porsche/1-2-porsche-free-png-image-thumb.png',
    }

    const handleCarDetailsRoutes = ()=>{
        navigation.navigate('CarDetails');
    }

    return (
        <Container>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo 
                            width={RFValue(108)}
                            height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            <CarList
                data={[1,2,3,4,5,6,7,8,9]}
                keyExtractor={item=>String(item)}
                renderItem={(item)=> 
                    <Car 
                        data={carData} 
                        onPress={handleCarDetailsRoutes} 
                    />
                }
            />
                

            
         </Container>
    );
}