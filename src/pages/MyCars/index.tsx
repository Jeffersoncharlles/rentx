import React,{useState, useEffect} from 'react';
import { api } from '../../services/api';
import { StatusBar, FlatList } from 'react-native';
import {BackButton} from '../../components/BackButton';
import { useIsFocused, useNavigation,useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import {AntDesign} from '@expo/vector-icons';
import { Car as ModelCar } from '../../database/model/car';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    AppoIntments,
    AppoIsmenesTitle,
    AppoIsmenesQuantity,
    CarWapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { format,parseISO } from 'date-fns';

interface DataProps{
    id:string;
    car:ModelCar;
    start_date:string;
    end_date: string;
}

export const MyCars = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const isFocus = useIsFocused();
    const [cars, setCars] = useState<DataProps[]>([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    const handleBack = () =>{
        navigation.goBack();
    }


    useEffect(()=>{
        const fetchCars  = async ()=>{
            try {
                const resp = await api.get(`/rentals`);
                const dataFormatted = resp.data.map((data:DataProps)=>{
                    return{
                        id:data.id,
                        car:data.car,
                        start_date:format(parseISO(data.start_date),'dd/MM/yyyy'),
                        end_date:format(parseISO(data.end_date),'dd/MM/yyyy'),
                    }
                })
                setCars(dataFormatted);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchCars();
    },[isFocus])

    return (
        <Container>
            <Header>
                <StatusBar 
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"

                />
                <BackButton
                    onPress={handleBack}
                    color={theme.colors.shape}
                />
                <Title>
                    Seus agendamentos,
                    estão aqui.
                </Title>
                <SubTitle>
                    Conforto, Segurança, Praticidade
                </SubTitle>
                
            </Header>
            {loading ? <LoadAnimation /> :
                <Content>
                    <AppoIntments>
                        <AppoIsmenesTitle>Agendamentos Feitos</AppoIsmenesTitle>
                        <AppoIsmenesQuantity>{cars.length}</AppoIsmenesQuantity>
                    </AppoIntments>
                    <FlatList 
                        data={cars}
                        keyExtractor={item =>String(item.id)}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=>(
                            <CarWapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.start_date}</CarFooterDate>
                                        <AntDesign 
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.title}
                                            style={{marginHorizontal: 10}}
                                        />
                                        <CarFooterDate>{item.end_date}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWapper>
                        )}
                    
                    />

                </Content>
            }

         </Container>
    );
}