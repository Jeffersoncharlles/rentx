import React from 'react';
import { Button , StyleSheet} from 'react-native';


import Animated, {useSharedValue, useAnimatedStyle} from 'react-native-reanimated';

import {
    Container,
} from './styles';

export const Splash = () => {
    const animation = useSharedValue(0);//compartilhar valores na animação

     //para animar o comportamento visual em tela
     //e animatestyle e basicamente um objeto de estilo igual stylesheet
    const animatedStyles = useAnimatedStyle(()=>{
        return{
            transform: [{translateX: animation.value}]
        }
    });
   

    const handleAnimationPosition = ()=>{
        animation.value = Math.random()*400;
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