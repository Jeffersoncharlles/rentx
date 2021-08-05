import React from 'react';
import { Button , StyleSheet, Dimensions} from 'react-native';


import Animated, {useSharedValue, useAnimatedStyle,withTiming, Easing} from 'react-native-reanimated';

import {
    Container,
} from './styles';

const WIDTH = Dimensions.get('window').width;

export const Splash = () => {
    const animation = useSharedValue(0);//compartilhar valores na animação

     //para animar o comportamento visual em tela
     //e animateStyle e basicamente um objeto de estilo igual stylesheet
     //eixo x lados eixo y cima baixo
    const animatedStyles = useAnimatedStyle(()=>{
        return{
            transform: [
                {
                translateX: withTiming(animation.value,{ 
                        duration:3000,
                        easing:Easing.bounce
                    }
                    )
                }
            ]
        }
    });
   

    const handleAnimationPosition = ()=>{
        animation.value = Math.random() * (WIDTH - 100);
    }

    return(
        <Container>

            <Animated.View style={[styles.box,animatedStyles]} />

        <Button title="Mover" onPress={handleAnimationPosition} />

        </Container>
    );
}

const styles = StyleSheet.create({
    box:{
        width: 100,
        height: 100,
        backgroundColor: "red",
    }
});