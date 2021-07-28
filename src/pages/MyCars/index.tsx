import React,{useState, useEffect} from 'react';
import CarDTO from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { StatusBar, FlatList } from 'react-native';
import {BackButton} from '../../components/BackButton';
import { useNavigation,useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    AppoIntments,
    AppoIsmenesTitle,
    AppoIsmenesQuantity,
} from './styles';
import { Car } from '../../components/Car';

interface CarProps {
    id: string;
    user_id:string;
    car: CarDTO;
}


export const MyCars = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);

    const userId = '1';
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

            <Content>
                <AppoIntments>
                    <AppoIsmenesTitle>Agendamentos Feitos</AppoIsmenesTitle>
                    <AppoIsmenesQuantity>05</AppoIsmenesQuantity>
                </AppoIntments>
                <FlatList 
                    data={cars}
                    keyExtractor={item =>item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item})=>(
                        <Car data={item.car} />
                    )}
                
                />

            </Content>

         </Container>
    );
}