import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { api } from '../../services/api';
import { Load } from '../../components/Load';
import CarDTO from '../../dtos/CarDTO';

import { Ionicons } from '@expo/vector-icons';


import Logo from '../../assets/logo.svg';

import {Car} from '../../components/Car';


import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CarList,
    MyCarsButton
} from './styles';


export const Home = () => {
    const [cars,setCars] = useState([]);
    const [loading,setLoading] = useState(true);
    const navigation = useNavigation();
    const theme = useTheme();

    const handleCarDetailsRoutes = (car : CarDTO)=>{
        navigation.navigate('CarDetails', {car});
    }
    const handleMyCarsOpen = ()=>{
        navigation.navigate('MyCars');
    }

    useEffect(()=>{
        const fetchCar = async ()=>{
          try {
            const response = await api.get('/cars');
            setCars(response.data);
          } catch (error) {
              console.log(error);
          }finally{
              setLoading(false);
          }
        };

        fetchCar();
    },[]);

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
                        Total de {cars.length} carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            
            {loading ? <Load/> :
                <CarList
                    data={cars}
                    keyExtractor={item=>String(item.id)}
                    renderItem={({item})=> 
                        <Car 
                            data={item} 
                            onPress={()=>handleCarDetailsRoutes(item)} 
                        />
                    }
                />
            }

            <MyCarsButton onPress={handleMyCarsOpen}>
                <Ionicons 
                    name="ios-car-sport"
                    size={32}
                    color={theme.colors.line}
                />
            </MyCarsButton>
            
         </Container>
    );
}