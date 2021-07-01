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


export const Scheduling = () => {


    const theme = useTheme();


    return (
        <Container>
            <Header>
                <StatusBar 
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"

                />
                <BackButton
                    onPress={()=>{}}
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
                />
            </Footer>

         </Container>
    );
}