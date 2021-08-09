import React , {useEffect} from 'react';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, {
    useSharedValue, 
    useAnimatedStyle,
    withTiming, 
    Easing,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';

import {
    Container,
} from './styles';

export const Splash = () => {
    const splashAnimation = useSharedValue(0);

    const brandStyle = useAnimatedStyle(()=>{
        return  {
            opacity: interpolate(splashAnimation.value,[0,50],[1,0],),
            transform: [
                {
                    translateX:interpolate(splashAnimation.value,
                        [0,50],
                        [0, -50],
                        Extrapolate.CLAMP
                    )
                }
            ],
        }
    });

    const logoStyle = useAnimatedStyle(()=>{
        return {
            opacity: interpolate(splashAnimation.value,[0,25,50],[0,.3,1],),
            transform: [
                {
                translateX: interpolate(splashAnimation.value,
                    [0,50],
                    [-50,0],
                    Extrapolate.CLAMP
                    )
                }
            ],
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

            <Animated.View style={[brandStyle,{position:'absolute'}]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={[logoStyle,{position:'absolute'}]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>

        </Container>
    );
}
