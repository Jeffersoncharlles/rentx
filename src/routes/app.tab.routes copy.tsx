import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import { Home } from '../pages/Home';
import { MyCars } from '../pages/MyCars';
import {SignUpSecondStep} from '../pages/SignUp/SignUpSecondStep';


const {Navigator, Screen} = createBottomTabNavigator();

export const AppTabRoutes = () => {


    return (
        <Navigator>
            <Screen 
                name="Home"
                component={Home}
            
            />
            <Screen 
                name="Profile"
                component={Home}
            
            />
            <Screen 
                name="SignUpSecondStep"
                component={SignUpSecondStep}
            
            />
            <Screen 
                name="MyCars"
                component={MyCars}
            
            />

        </Navigator>
    );
}