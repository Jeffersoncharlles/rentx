import React from 'react';
import { useTheme } from 'styled-components';
import { ActivityIndicator} from 'react-native';

import {
    Container,
    Title,
} from './styles';
import theme from '../../styles/theme';

interface Props{
    title: string;
    color?: string;
    onPress: ()=> void;
    enabled?: boolean;
    loading?: boolean;
    light?:boolean;
}

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