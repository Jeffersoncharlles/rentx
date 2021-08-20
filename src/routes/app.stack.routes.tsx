import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { Splash } from '../pages/Splash';
import { Home } from '../pages/Home';
import { CarDetails } from '../pages/CarDetails';
import { SchedulingDetails } from '../pages/SchedulingDetails';
import { Scheduling } from '../pages/Scheduling';
import { Confirmation } from '../pages/Confirmation';
import { MyCars } from '../pages/MyCars';


const {Navigator, Screen} = createStackNavigator();

export const AppStackRoutes = () => {


    return (
        <Navigator 
            headerMode="none"
            initialRouteName="Home"
        >
            <Screen 
                name="Home"
                component={Home}
            />
            <Screen 
                name="Splash"
                component={Splash}
            
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