import React from 'react';
import {BackButton} from '../../components/BackButton';
import {ImageSlider} from '../../components/ImageSlider';
import {Accessory} from '../../components/Accessory';
import {Button} from '../../components/Button';

import SpeedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import exchangeSvg from '../../assets/exchange.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import peopleSvg from '../../assets/people.svg';

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
    
} from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';

interface Params {
    car: any;
}

export const CarDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const  { car } = route.params as Params;

    const handleSchedulingRoutes = ()=>{
        navigation.navigate('Scheduling');
    }

    const handleBack = () =>{
        navigation.goBack();
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack}/>
            </Header>
            <CarImages>
                <ImageSlider 
                    imagesUrl={car.photos} 
                />
            </CarImages>
            <Content >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(item=>(
                            <Accessory 
                                key={item.type}
                                name={item.name}
                                icon={SpeedSvg} 
                            />
                            ))
                        
                    }
                    
                </Accessories>
                <About>
                    {car.about}
                </About>
            </Content>
            <Footer>
                <Button title="Escolher período do aluguel"  color=""  onPress={handleSchedulingRoutes}/>
            </Footer>
         </Container>
    );
}