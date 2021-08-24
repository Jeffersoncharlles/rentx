import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar , Button} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { api } from '../../services/api';
import CarDTO from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/model/car';
import { database } from '../../database';
import {synchronize} from '@nozbe/watermelondb/sync';

import {useNetInfo} from '@react-native-community/netinfo';
//verificar se tem internet

import Animated ,{
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';



import Logo from '../../assets/logo.svg';

import {Car} from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';


import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CarList,
} from './styles';


export const Home = () => {
    const netInfo = useNetInfo();
    const [cars,setCars] = useState<ModelCar[]>([]);
    const [loading,setLoading] = useState(true);
    const navigation = useNavigation();
    const theme = useTheme();

    // const positionY = useSharedValue(0);
    // const positionX = useSharedValue(0);
    // const myCarsButtonStyle = useAnimatedStyle(()=>{
    //     return{
    //         transform: [
    //             {translateX: positionX.value},
    //             {translateY: positionY.value},
    //         ]
    //     }
    // });

    //pullChanges e a função que vai buscar atualização
    //lasPulledAt // timestamps de quando teve atualização
    //push e o que envia as mudanças do lado do app

    const offlineSynchronize = async ()=>{
        await synchronize({
            database,
            pullChanges: async ({lastPulledAt})=>{
                const {data} = await api
                    .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0 }`);
                const {changes,latestVersion} = data;
                // console.log('BACKEND PARA O APP');
                // console.log(data);
                return {changes, timestamp: latestVersion}
            },
            pushChanges: async ({changes})=>{
                // console.log('APP PARA O BACKENDR');
                // console.log(changes);
                const user = changes.users;
                await api.post('/users/sync', user);
            }
        });
    }

    const handleCarDetailsRoutes = (car : CarDTO)=>{
        navigation.navigate('CarDetails', {car});
    }

    useEffect(()=>{
        //resolvendo problema de memory leak
        let isMounted = true;


        const fetchCar = async ()=>{
          try {
            //const {data} = await api.get('/cars');
                const carCollection = database.get<ModelCar>('cars');
                const data = await carCollection.query().fetch();
            if (isMounted) {
                setCars(data);
            }
            
          } catch (error) {
              console.log(error);
          }finally{
              if (isMounted) {
                setLoading(false);
              }
              
          }
        };

        fetchCar();
        return ()=>{
            //depois que ele passa por tudo eu seto para falso
            // ele so seta o set car se for verdadeira
            isMounted = false;
        };
    },[]);
    
    useEffect(()=>{
        if (netInfo.isConnected === true) {
            offlineSynchronize();
        }
    },[netInfo.isConnected]);

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
                    { !loading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                        //se o loading for falso ai pode mostrar
                    }
                </HeaderContent>
            </Header>
            
            
            {loading ? <LoadAnimation/> :
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
         </Container>
    );
}
