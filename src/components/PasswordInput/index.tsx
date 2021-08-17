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
    iconName:React.ComponentProps<typeof Feather>['name']
}

export const PasswordInput = ({iconName, ...rest} :Props) => {
    const [isPassVisible,setIsPassVisible] =useState(true);
    const theme = useTheme();

    const handlePassVisibilityChange = ()=>{
        setIsPassVisible(oldState => !oldState);
        //pegar o estado anterior e inverter
    }

    return(
        <Container >
            <IconContainer>
            <Feather 
                name={iconName}
                size={24}
                color={theme.colors.text_details}
            />
            </IconContainer>
            

            <InputText 
                secureTextEntry={isPassVisible}
                //so aparece a senha se tiver false isPassVisible
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