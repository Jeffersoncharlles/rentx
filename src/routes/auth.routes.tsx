import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { Splash } from '../pages/Splash';
import { Signin } from '../pages/Signin';
import { SignUpFirstStep } from '../pages/SignUp/SignUpFirstStep';
import {SignUpSecondStep} from '../pages/SignUp/SignUpSecondStep';
import { Confirmation } from '../pages/Confirmation';



const {Navigator, Screen} = createStackNavigator();

export const AuthRoutes = () => {


    return (
        <Navigator 
            headerMode="none"
            initialRouteName="Splash"
        >
            <Screen 
                name="Splash"
                component={Splash}
            
            />
            <Screen 
                name="Signin"
                component={Signin}
            
            />
            <Screen 
                name="SignUpFirstStep"
                component={SignUpFirstStep}
            
            />
            <Screen 
                name="SignUpSecondStep"
                component={SignUpSecondStep}
            
            />
            <Screen 
                name="Confirmation"
                component={Confirmation}
            
            />
        </Navigator>
    );
}