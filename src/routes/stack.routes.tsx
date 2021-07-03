import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { Home } from '../pages/Home';
import { CarDetails } from '../pages/CarDetails';
import { SchedulingDetails } from '../pages/SchedulingDetails';
import { Scheduling } from '../pages/Scheduling';
import { SchedulingComplete } from '../pages/SchedulingComplete';

const {Navigator, Screen} = createStackNavigator();

export const StackRoutes = () => {


    return (
        <Navigator 
            headerMode="none"
        >
            <Screen 
                name="Home"
                component={Home}
            
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
                name="SchedulingComplete"
                component={SchedulingComplete}
            
            />

        </Navigator>
    );
}