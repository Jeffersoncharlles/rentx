import React from 'react';
import { Feather } from '@expo/vector-icons';

import  { Calendar as CustomCalendar, CalendarList, Agenda} from 'react-native-calendars';
import { useTheme } from 'styled-components';

import {
    Container,
} from './styles';

export const Calendar = () => {
    const theme = useTheme();

    return (
        <Container>
            <CustomCalendar 
                renderArrow={(direction)=> 
                    <Feather 
                        size={24}
                        color={theme.colors.main}
                    />
                }

            />
         </Container>
    );
}