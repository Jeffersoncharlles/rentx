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
import { Calendar , DayProps ,generateInterval, MarkedDatesProps} from '../../components/Calendar';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface RentalPeriod{
    start: number;
    startFormatted: string;
    end: number;
    endFormatted: string;
}


export const Scheduling = () => {
    const navigation = useNavigation();
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);


    const theme = useTheme();

    const handleSchedulingDetailsRoutes = () =>{
        navigation.navigate('SchedulingDetails');
    }

    const handleBack = () =>{
        navigation.goBack();
    }
    
    const handleChangeDates = (date: DayProps) =>{
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end ;
            end = start;
        }

        setLastSelectedDate(end);

        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0]; //pegar a primeira data do objeto
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1]; //pegar a ultima data do objeto

        setRentalPeriod({
            start: start.timestamp,
            end:end.timestamp,
            startFormatted: format(getPlatformDate(new Date (firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date (endDate)), 'dd/MM/yyyy'),
        });
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
                        <DateValue selected={true}>{rentalPeriod.startFormatted}</DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATE</DateTitle>
                        <DateValue selected={false}>{rentalPeriod.endFormatted}</DateValue>
                    </DateInfo>

                </RentalPeriod>
            </Header>

            <Content>
                <Calendar 
                    markedDates={markedDates}
                    onDayPress={handleChangeDates}
                
                />
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