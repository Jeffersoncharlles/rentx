import React, {useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import {
    Container,
    InputText,
    IconContainer,
    ChangePassVisibilityButton,

} from './styles';


interface Props extends TextInputProps{
    iconName:React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export const PasswordInput = ({iconName, value,...rest} :Props) => {
    const [isPassVisible,setIsPassVisible] =useState(true);
    const theme = useTheme();

    const handlePassVisibilityChange = ()=>{
        setIsPassVisible(oldState => !oldState);
        //pegar o estado anterior e inverter
    }
    const [isFocused,setIsFocused] =useState(false);
    const [isFilled,SetIsFilled] =useState(false);

    const handleInputFocus =()=>{
        setIsFocused(true);
    }
    const handleInputBlur =()=>{
        setIsFocused(false);
        SetIsFilled(!!value);
        //!! se tem conteúdo e verdadeiro se nao e falso
    }

    return(
        <Container isFocused={isFocused}>
            <IconContainer>
            <Feather 
                name={iconName}
                size={24}
                color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_details}
            />
            </IconContainer>
            

            <InputText 
                secureTextEntry={isPassVisible}
                //so aparece a senha se tiver false isPassVisible
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...rest}
            />

            <ChangePassVisibilityButton onPress={handlePassVisibilityChange}>
                <IconContainer>
                    <Feather 
                        name={isPassVisible ? 'eye': 'eye-off'}
                        size={24}
                        color={theme.colors.text_details}
                    />
                </IconContainer>
            </ChangePassVisibilityButton>

        </Container>
    );
}