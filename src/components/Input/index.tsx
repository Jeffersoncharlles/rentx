import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import {
    Container,
    InputText,
    IconContainer,

} from './styles';


interface Props extends TextInputProps{
    iconName:React.ComponentProps<typeof Feather>['name']
}

export const Input = ({iconName, } :Props) => {
    const theme = useTheme();

    return(
        <Container>
            <IconContainer>
            <Feather 
                name={iconName}
                size={24}
                color={theme.colors.text_details}
            />
            </IconContainer>
            

            <InputText />

        </Container>
    );
}