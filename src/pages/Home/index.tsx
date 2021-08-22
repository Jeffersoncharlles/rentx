import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar , StyleSheet, BackHandler} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { api } from '../../services/api';
import { Load } from '../../components/Load';
import CarDTO from '../../dtos/CarDTO';

import { Ionicons } from '@expo/vector-icons';

import {RectButton, PanGestureHandler} from 'react-native-gesture-handler';
//PanGestureHandler identifica quando user segura e arrasta na tela

import Animated ,{
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated';
const  ButtonAnimated = Animated.createAnimatedComponent(RectButton);

//withSpring física


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
    const [cars,setCars] = useState([]);
    const [loading,setLoading] = useState(true);
    const navigation = useNavigation();
    const theme = useTheme();

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);
    const myCarsButtonStyle = useAnimatedStyle(()=>{
        return{
            transform: [
                {translateX: positionX.value},
                {translateY: positionY.value},
            ]
        }
    });
    // const onGestureEvent = useAnimatedGestureHandler({
    //     //start começou active quando esta segurando e o end quando solto
    //     onStart(e,ctx:any){
    //         ctx.positionX = positionX.value;
    //         ctx.positionY = positionY.value;
    //     },
    //     onActive(e,ctx:any){
    //         positionX.value = ctx.positionX + e.translationX;
    //         positionY.value = ctx.positionY + e.translationY;
    //     },
    //     onEnd(){
    //         positionX.value = withSpring(0);
    //         positionY.value = withSpring(0);
    //     }
    // });

    const handleCarDetailsRoutes = (car : CarDTO)=>{
        navigation.navigate('CarDetails', {car});
    }

    useEffect(()=>{
        //resolvendo problema de memory leak
        let isMounted = true;


        const fetchCar = async ()=>{
          try {
            const response = await api.get('/cars');
            if (isMounted) {
                setCars(response.data);
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
