import React from 'react';
import { useTheme } from 'styled-components';

import {
    Container,
    Title,
} from './styles';

interface Props{
    title: string;
    color?: string;
    onPress: ()=> void;
    enabled?: boolean;
}

export const Button = ({title, color, enabled = true,onPress}: Props) => {
    const themes = useTheme();

    return (
        <Container  
            color={color ? color : themes.colors.main} 
            onPress={onPress} 
            enabled={enabled}
            style={{opacity: enabled ? 1 : .5}}
        >
            <Title>{title}</Title>
         </Container>
    );
}