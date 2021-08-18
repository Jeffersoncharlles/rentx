import React,{useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import {
    Container,
    InputText,
    IconContainer,

} from './styles';


interface Props extends TextInputProps{
    iconName:React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export const Input = ({iconName,value, ...rest} :Props) => {
    const [isFocused,setIsFocused] =useState(false);
    const [isFilled,SetIsFilled] =useState(false);
    const theme = useTheme();

    const handleInputFocus =()=>{
        setIsFocused(true);
    }
    const handleInputBlur =()=>{
        setIsFocused(false);
        SetIsFilled(!!value);
        //!! se tem conteúdo e verdadeiro se nao e falso
    }

    return(
        <Container >
            <IconContainer isFocused={isFocused}>
            <Feather 
                name={iconName}
                size={24}
                color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_details}
                
                // || ou
            />
            </IconContainer>
            

            <InputText 
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isFocused={isFocused}
                {...rest}
            />

        </Container>
    );
}