import React from 'react';
import { useWindowDimensions } from 'react-native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { StatusBar } from 'react-native';

import { ConfirmaButton } from '../../components/ConfirmaButton';

import {
    Container,
    Content,
    Title,
    Message,
    Footer,
} from './styles';
import { useNavigation,useRoute } from '@react-navigation/native';

interface Params {
    title:string;
    message: string;
    nextScreenRoute: string;
}

export const Confirmation = () => {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();

    const route = useRoute();
    const {title, message,nextScreenRoute} = route.params as Params;

    const handleOKCompleteRoutes = () =>{
        navigation.navigate(nextScreenRoute);
    }

    return (
        <Container>
            <StatusBar 
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"

                />
            <LogoSvg 
                width={width}
            />

            <Content>
                <DoneSvg 
                    width={80}
                    height={80}
                />
                <Title>
                    {title}
                </Title>

                <Message>
                    {message}
                
                </Message>
            </Content>
            <Footer>
                <ConfirmaButton 
                    title="Ok"
                    onPress={handleOKCompleteRoutes}
                />
            </Footer>
         </Container>
    );
}