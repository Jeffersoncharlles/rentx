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
                    imagesUrl={['https://freepngimg.com/thumb/porsche/1-2-porsche-free-png-image-thumb.png']} 
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
                    <Accessory name= "380km/h" icon={SpeedSvg} />
                    <Accessory name= "3.2s" icon={accelerationSvg} />
                    <Accessory name= "auto" icon={exchangeSvg} />
                    <Accessory name= "800 hp" icon={forceSvg} />
                    <Accessory name= "Gasolina" icon={gasolineSvg} />
                    <Accessory name= "2 Pessoas" icon={peopleSvg} />
                </Accessories>
                <About>
                Este é automóvel desportivo. 
                Surgiu do lendário touro de lide indultado na praça 
                Real Maestranza de Sevilla. 
                É um belíssimo carro para quem gosta de acelerar.
                </About>
            </Content>
            <Footer>
                <Button title="Escolher período do aluguel"  color=""  onPress={handleSchedulingRoutes}/>
            </Footer>
         </Container>
    );
}