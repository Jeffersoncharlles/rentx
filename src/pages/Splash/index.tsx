import React from 'react';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, {
    useSharedValue, 
    useAnimatedStyle,
    withTiming, 
    Easing
} from 'react-native-reanimated';

import {
    Container,
} from './styles';

export const Splash = () => {
    

     //para animar o comportamento visual em tela
     //e animateStyle e basicamente um objeto de estilo igual stylesheet
     //eixo x lados eixo y cima baixo

    return(
        <Container>

            <Animated.View>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View>
                <LogoSvg width={180} height={20} />
            </Animated.View>

        </Container>
    );
}
