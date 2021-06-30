import React from 'react';
import {BackButton} from '../../components/BackButton';
import { useTheme } from 'styled-components';

import {
    Container,
    Header,
    Title,
} from './styles';

export const Scheduling = () => {

    
    const theme = useTheme();


    return (
        <Container>
            <Header>
                <BackButton
                    onPress={()=>{}}
                    color={theme.colors.shape}
                />
                <Title>
                Escolha uma
                data de início e
                fim do aluguel
                </Title>
            </Header>

         </Container>
    );
}