import React from 'react';
import { StatusBar } from 'react-native';
import {BackButton} from '../../components/BackButton';
import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg';

import { Button } from '../../components/Button';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';
import { Calendar } from '../../components/Calendar';
import { useNavigation } from '@react-navigation/native';


export const Scheduling = () => {
    const navigation = useNavigation();


    const theme = useTheme();

    const handleSchedulingDetailsRoutes = () =>{
        navigation.navigate('SchedulingDetails');
    }

    const handleBack = () =>{
        navigation.goBack();
    }

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
                Escolha uma {'\n'}
                data de início e {'\n'}
                fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={true}>30/06/2021</DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue selected={false}></DateValue>
                    </DateInfo>

                </RentalPeriod>
            </Header>

            <Content>
                <Calendar />
            </Content>

            <Footer>
                <Button 
                   title="Confirmar" 

                   onPress={handleSchedulingDetailsRoutes}
                />
            </Footer>

         </Container>
    );
}