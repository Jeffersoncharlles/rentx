import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar , StyleSheet} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { api } from '../../services/api';
import { Load } from '../../components/Load';
import CarDTO from '../../dtos/CarDTO';

import { Ionicons } from '@expo/vector-icons';

import {RectButton} from 'react-native-gesture-handler';

import Animated ,{
    useSharedValue,
    useAnimatedStyle
} from 'react-native-reanimated';
const  ButtonAnimated = Animated.createAnimatedComponent(RectButton);


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
            
            <Animated.View 
                style={[
                    myCarsButtonStyle,
                    {
                        position: 'absolute',
                        bottom: 13,
                        right: 22
                    }
                ]}
            
            >
                <ButtonAnimated 
                    onPress={handleMyCarsOpen}
                    style={[styles.button, {backgroundColor:theme.colors.main}]}
                
                >
                    <Ionicons 
                        name="ios-car-sport"
                        size={32}
                        color={theme.colors.line}
                    />
                </ButtonAnimated>
            </Animated.View>
         </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})