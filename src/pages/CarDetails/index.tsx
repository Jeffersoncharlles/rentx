import React from 'react';
import {BackButton} from '../../components/BackButton';
import {ImageSlider} from '../../components/ImageSlider';
import {Accessory} from '../../components/Accessory';
import {Button} from '../../components/Button';

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
    
} from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';
import CarDtos from '../../dtos/CarDTO';
interface Params {
    car: CarDtos;
}

export const CarDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const  { car } = route.params as Params;

    const handleSchedulingRoutes = ()=>{
        navigation.navigate('Scheduling',{car});
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
                                icon={getAccessoriesIcon(item.type)} 
                            />
                            ))
                        
                    }
                    
                </Accessories>
                <About>
                    {car.about}
                </About>
            </Content>
            <Footer>
                <Button title="Escolher período do aluguel"  color=""  onPress={handleSchedulingRoutes} />
            </Footer>
         </Container>
    );
}