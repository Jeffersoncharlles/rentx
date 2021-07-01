import React from 'react';
import { Feather } from '@expo/vector-icons';

import  { Calendar as CustomCalendar, LocaleConfig, Agenda} from 'react-native-calendars';
import { useTheme } from 'styled-components';

import {
    Container,
} from './styles';

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    dayNames: ['Domingo', 'Segunda','Terça', 'Quarta', 'Quinta','Sexta','Sábado'],
    dayNamesShort: ['DOM','SEG','TER','QUA','QUI','SEX','SAB'],
    today: 'Hoje'
}
LocaleConfig.defaultLocale = 'pt-br';
export const Calendar = () => {
    const theme = useTheme();

    return (
        <Container>
            <CustomCalendar 
                renderArrow={(direction)=> 
                    <Feather 
                        size={24}
                        color={theme.colors.text}
                        name={direction == 'left' ? "chevron-left" : "chevron-right"}
                    />
                }

                headerStyle={{
                    backgroundColor: theme.colors.background_secondary,
                    borderBottomWidth: 0.5,
                    borderBottomColor:theme.colors.text_details,
                    paddingBottom:10,
                    marginBottom:10
                }}

                theme={{
                    textDayFontFamily: theme.fonts.primary_400,
                    textDayHeaderFontFamily: theme.fonts.primary_500,
                    textDayHeaderFontSize:10,
                    textMonthFontSize:20,
                    monthTextColor:theme.colors.title,
                    textMonthFontFamily:theme.fonts.secondary_600,
                    arrowStyle: {
                        marginHorizontal: -15
                    }
                }}

                firstDay={1}
                minDate={new Date()}
            />
         </Container>
    );
}