import React,{useState, useEffect} from 'react';
import CarDTO from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { StatusBar, FlatList } from 'react-native';
import {BackButton} from '../../components/BackButton';
import { useNavigation,useRoute } from '@react-navigation/native';
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
interface CarProps {
    id: number;
    user_id:number;
    car: ModelCar;
    startDate: string;
    endDate: string;
}


export const MyCars = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);

    const userId = 8;
    const theme = useTheme();


    const handleBack = () =>{
        navigation.goBack();
    }


    useEffect(()=>{
        const fetchCars  = async ()=>{
            try {
                const resp = await api.get(`/schedules_byuser?user_id=${userId}`);
                //console.log(resp.data);
                setCars(resp.data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchCars();
    },[])

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
                        keyExtractor={item =>item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item})=>(
                            <CarWapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign 
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.title}
                                            style={{marginHorizontal: 10}}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
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