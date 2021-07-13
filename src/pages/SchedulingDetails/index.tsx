import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';

import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import {BackButton} from '../../components/BackButton';
import {ImageSlider} from '../../components/ImageSlider';
import {Accessory} from '../../components/Accessory';
import {Button} from '../../components/Button';


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
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceTotal,
    RentalPriceDetailsView,
} from './styles';
import { useNavigation,useRoute } from '@react-navigation/native';
import {getAccessoriesIcon} from '../../utils/getAccessoriesIcon';
import CarDtos from '../../dtos/CarDTO';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface RentalPeriod{
    startFormatted: string;
    endFormatted: string;
}
interface Params {
    car: CarDtos;
    dates:string[];
}


export const SchedulingDetails = () => {
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const  { car, dates } = route.params as Params;


    const handleSchedulingCompleteRoutes = () =>{
        navigation.navigate('SchedulingComplete');
    }

    const handleBack = () =>{
        navigation.goBack();
    }

    useEffect(()=> {
        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date (dates[0])), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date (dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    },[]);

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
                        <Period>Ao Dia</Period>
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
               <RentalPeriod>
                   <CalendarIcon>
                        <Feather 
                           name="calendar"
                           size={RFValue(24)}
                           color={theme.colors.shape}
                        
                        />
                   </CalendarIcon>

                   <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.startFormatted}</DateValue>
                   </DateInfo>

                   <Feather 
                        name="chevron-right"
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue>{rentalPeriod.endFormatted}</DateValue>
                   </DateInfo>

               </RentalPeriod>

               <RentalPrice>
                   <RentalPriceLabel>TOTAL</RentalPriceLabel>
                   <RentalPriceDetailsView>
                        <RentalPriceDetails>R$ 580 x3 diárias</RentalPriceDetails>
                        <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                   </RentalPriceDetailsView>
               </RentalPrice>
            </Content>
            <Footer>
                <Button 
                    title="Alugar agora"  
                    color={theme.colors.success} 
                    onPress={handleSchedulingCompleteRoutes}
                />
            </Footer>
         </Container>
    );
}