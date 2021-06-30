import React from 'react';
import {BackButton} from '../../components/BackButton';
import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
} from './styles';

export const Scheduling = () => {


    const theme = useTheme();


    return (
        <Container>
            <Header>
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
                        <DateValue></DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue></DateValue>
                    </DateInfo>

                </RentalPeriod>
            </Header>


         </Container>
    );
}