import React , {useEffect} from 'react';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, {
    useSharedValue, 
    useAnimatedStyle,
    withTiming, 
    Easing,
    interpolate,

} from 'react-native-reanimated';

import {
    Container,
} from './styles';

export const Splash = () => {
    const splashAnimation = useSharedValue(0);

    const brandStyle = useAnimatedStyle(()=>{
        return  {
            opacity: splashAnimation.value
        }
    });

    const logoStyle = useAnimatedStyle(()=>{
        return {
            opacity: splashAnimation.value
        }
    });

     //para animar o comportamento visual em tela
     //e animateStyle e basicamente um objeto de estilo igual stylesheet
     //eixo x lados eixo y cima baixo

     useEffect(()=>{
        splashAnimation.value = withTiming(
            50,
            {duration: 1000}
        )
     },[]);

    return(
        <Container>

            <Animated.View style={brandStyle}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={logoStyle}>
                <LogoSvg width={180} height={20} />
            </Animated.View>

        </Container>
    );
}
