import React,{useEffect,useState} from 'react';
import {BackButton} from '../../components/BackButton';
import {ImageSlider} from '../../components/ImageSlider';
import {Accessory} from '../../components/Accessory';
import {Button} from '../../components/Button';
import { StatusBar, StyleSheet } from 'react-native';
import Animated ,{
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';

import {getAccessoriesIcon} from '../../utils/getAccessoriesIcon';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
    OfflineInfo,
} from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';
import CarDtos from '../../dtos/CarDTO';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Car as ModelCar } from '../../database/model/car';
import { api } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
    car: ModelCar;
}

export const CarDetails = () => {
    const scrollY = useSharedValue(0);
    const navigation = useNavigation();
    const route = useRoute();
    const netInfo = useNetInfo();
    const  { car } = route.params as Params;
    const [carUpdated,setCarUpdated] = useState<CarDtos>({} as CarDtos);

    const handleSchedulingRoutes = ()=>{
        navigation.navigate('Scheduling',{car});
    }

    const handleBack = () =>{
        navigation.goBack();
    }

    const scrollHandler = useAnimatedScrollHandler(e =>{
        scrollY.value = e.contentOffset.y;
        //gera o numero da posição do scroll
    });

    const headerStyleAnimation = useAnimatedStyle(()=>{
        return{
            height: interpolate(scrollY.value,
                [0,200],
                [200,70],
                Extrapolate.CLAMP
                //diminuindo altura e usando o interpolate para diminuir gradativamente de 200 a 70
                ),
        }
    });

    const sliderCarsStyleAnimation= useAnimatedStyle(()=>{
        return{
            opacity: interpolate(scrollY.value, [0,150],[1,0], Extrapolate.CLAMP),
            //animação para sumir o carro aos poucos
        }
    });
    useEffect(()=>{
        const fetchCarUpdate = async ()=>{
            const response = await api.get(`/cars/${car.id}`);

            setCarUpdated(response.data);
        }
        if (netInfo.isConnected === true) {
            fetchCarUpdate();
        }
    },[netInfo.isConnected]);

    return (
        <Container>
            <StatusBar 
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <Animated.View
            style={[headerStyleAnimation]}
            >
                <Header>
                    <BackButton onPress={handleBack}/>
                </Header>

                    <Animated.View 
                        style={sliderCarsStyleAnimation}
                    >
                    <CarImages>
                        <ImageSlider 
                            imagesUrl={
                              !!carUpdated.photos ? carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]} 
                        />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView 
           contentContainerStyle={{
               paddingHorizontal:24,
               paddingTop: getStatusBarHeight(),
           }}
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            //scrollEventThrottle render por quadro
            //16 da 60fps 
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    
                    <Rent>
                        <Period>{car.period}</Period>
                       
                            <Price>
                                R$ {netInfo.isConnected == true ? car.price : '...'}  
                            </Price>
                        
                    </Rent>
                </Details>

                {  carUpdated.accessories &&
                    <Accessories>
                        {
                            carUpdated.accessories.map(item=>(
                                <Accessory 
                                    key={item.type}
                                    name={item.name}
                                    icon={getAccessoriesIcon(item.type)} 
                                />
                                ))
                            
                        }
                        
                    </Accessories>
                }
                <About>
                    {car.about}
                </About>
            </Animated.ScrollView>
            <Footer>
                <Button 
                    title="Escolher período do aluguel"  
                    color="" 
                    onPress={handleSchedulingRoutes} 
                    enabled={netInfo.isConnected === true}
                    />
                {
                    netInfo.isConnected === false &&
                    <OfflineInfo>
                        Conecte-se a internet para ver mais detalhes e agendar seu carro
                    </OfflineInfo>
                }
            </Footer>
         </Container>
    );
}

// const styles = StyleSheet.create({

// })