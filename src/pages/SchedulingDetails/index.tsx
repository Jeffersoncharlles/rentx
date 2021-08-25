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
import { api } from '../../services/api';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

interface RentalPeriod{
    startFormatted: string;
    endFormatted: string;
}
interface Params {
    car: CarDtos;
    dates:string[];
}


export const SchedulingDetails = () => {
    const [loading, setLoading] = useState(true);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const [carUpdated,setCarUpdated] = useState<CarDtos>({} as CarDtos);
    const netInfo = useNetInfo();
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const  { car, dates } = route.params as Params;


    const rentTotal = Number(dates.length * car.price);


    const handleSchedulingCompleteRoutes = async () =>{
        

        const userId = 1;

        await api.post(`/rentals`,{
            user_id: userId,
            car_id:car.id,
            start_date: new Date (dates[0]),
            end_date:  new Date (dates[dates.length - 1]),
            total:rentTotal
        }).then(() => navigation.navigate('Confirmation',{
            title:'Carro alugado!',
            message:`Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
            nextScreenRoute: 'Home'
        }))
        .catch(()=> { 
            Alert.alert("Não foi possível confirmar o agendamento."); 
            setLoading(true);
        });

        
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
            <Header>
                <BackButton onPress={handleBack}/>
            </Header>
            <CarImages>
                <ImageSlider 
                    imagesUrl={ !!carUpdated.photos ? carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]} 
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
                        <Price>R$ {car.price}</Price>
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
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.endFormatted}</DateValue>
                   </DateInfo>

               </RentalPeriod>

               <RentalPrice>
                   <RentalPriceLabel>TOTAL</RentalPriceLabel>
                   <RentalPriceDetailsView>
                        <RentalPriceDetails>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceDetails>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                   </RentalPriceDetailsView>
               </RentalPrice>
            </Content>
            <Footer>
                <Button 
                    title="Alugar agora"  
                    color={theme.colors.success} 
                    onPress={handleSchedulingCompleteRoutes}
                    loading={!loading}
                    enabled={loading}
                />
            </Footer>
         </Container>
    );
}