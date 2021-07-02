import React from 'react';
import { Feather } from '@expo/vector-icons';

import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

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


export const SchedulingDetails = () => {
    const theme = useTheme();


    return (
        <Container>
            <Header>
                <BackButton onPress={()=>{}}/>
            </Header>
            <CarImages>
                <ImageSlider 
                    imagesUrl={['https://freepngimg.com/thumb/porsche/1-2-porsche-free-png-image-thumb.png']} 
                />
            </CarImages>
            <Content >
                <Details>
                    <Description>
                        <Brand>LAmborghin</Brand>
                        <Name>Hurucan</Name>
                    </Description>
                    
                    <Rent>
                        <Period>Ao Dia</Period>
                        <Price>R$ 580</Price>
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
                        <DateValue>18/06/2021</DateValue>
                   </DateInfo>

                   <Feather 
                        name="chevron-right"
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue>20/06/2021</DateValue>
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
                <Button title="Alugar agora"  color={theme.colors.success} />
            </Footer>
         </Container>
    );
}