import React from 'react';

import LottieView from 'lottie-react-native';

import loadAnimated from '../../assets/load_animated.json';

import {
    Container,
} from './styles';

export const LoadAnimation = () => {

    return(
        <Container>
            <LottieView 
                source={loadAnimated}
                style={{height:200}}
                resizeMode="contain"
                autoPlay
                loop
            />
        </Container>
    );
}