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
}

export const Button = ({title, color, onPress}: Props) => {
    const themes = useTheme();

    return (
        <Container  color={color ? color : themes.colors.main} onPress={onPress}>
            <Title>{title}</Title>
         </Container>
    );
}