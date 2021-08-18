import React from 'react';
import { useTheme } from 'styled-components';
import { ActivityIndicator} from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Title,
} from './styles';
import theme from '../../styles/theme';

interface Props extends RectButtonProps{
    title: string;
    color?: string;
    // onPress: ()=> void;
    // enabled?: boolean;
    loading?: boolean;
    light?:boolean;
}
//onPress e enabled sao propriedades de um botão e entendendo props nao precisa deles na interface

export const Button = ({title, color, enabled = true, loading ,light = false,onPress}: Props) => {
    const themes = useTheme();

    return (
        <Container  
            color={color ? color : themes.colors.main} 
            onPress={onPress} 
            enabled={enabled}
            style={{opacity: (enabled === false || loading === true) ? .5 : 1}}
        >
            {loading 
               ? <ActivityIndicator color={theme.colors.shape} />
               : <Title light={light}>{title}</Title>
             }
         </Container>
    );
}