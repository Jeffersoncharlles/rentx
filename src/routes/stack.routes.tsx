import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { Splash } from '../pages/Splash';
import { Signin } from '../pages/Signin';
import { SignUpFirstStep } from '../pages/SignUp/SignUpFirstStep';
import {SignUpSecondStep} from '../pages/SignUp/SignUpSecondStep';
import { Home } from '../pages/Home';
import { CarDetails } from '../pages/CarDetails';
import { SchedulingDetails } from '../pages/SchedulingDetails';
import { Scheduling } from '../pages/Scheduling';
import { Confirmation } from '../pages/Confirmation';
import { MyCars } from '../pages/MyCars';


const {Navigator, Screen} = createStackNavigator();

export const StackRoutes = () => {


    return (
        <Navigator 
            headerMode="none"
            initialRouteName="Signin"
        >
            {/* <Screen 
                name="Splash"
                component={Splash}
            
            /> */}
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
                name="Home"
                component={Home}
                options={{
                    gestureEnabled:false,
                }}
            
            />
            <Screen 
                name="CarDetails"
                component={CarDetails}
            
            />
            <Screen 
                name="SchedulingDetails"
                component={SchedulingDetails}
            
            />
            <Screen 
                name="Scheduling"
                component={Scheduling}
            
            />
            <Screen 
                name="Confirmation"
                component={Confirmation}
            
            />
            <Screen 
                name="MyCars"
                component={MyCars}
            
            />

        </Navigator>
    );
}