import React from 'react';
import { useTheme } from 'styled-components';

import {
    Container,
    Title,
} from './styles';

interface Props{
    title: string;
    color?: string;
    
}

export const Button = ({title, color, ...rest}: Props) => {
    const themes = useTheme();

    return (
        <Container {...rest} color={color ? color : themes.colors.main}>
            <Title>{title}</Title>
         </Container>
    );
}