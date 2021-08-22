import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';

import {
    Container,
    Header,
    HeadTop,
    LogoutButton,
    HeaderTitle,
    PhotoContainer,
    Photo,
    PhotoButton,

} from './styles';

export const Profile = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const handleBack = ()=>{
        navigation.goBack();
    }

    const handleSinOut = ()=>{

    }

    return(
        <Container>
            <Header>
                <HeadTop>
                    <BackButton color={theme.colors.shape} onPress={handleBack} />
                    <HeaderTitle>
                        Editar Perfil
                    </HeaderTitle>
                    <LogoutButton onPress={handleSinOut} >
                        <Feather 
                            name="power"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </LogoutButton>
                </HeadTop>
                <PhotoContainer>
                    <Photo source={{uri:'https://avatars.githubusercontent.com/u/26746739?v=4'}} />
                    <PhotoButton onPress={()=>{}} > 
                        <Feather 
                            name="camera"
                            size={24}
                            color={theme.colors.main}
                        />
                    </PhotoButton>
                </PhotoContainer>
            </Header>

        </Container>
    );
}