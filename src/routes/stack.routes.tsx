import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { Splash } from '../pages/Splash';
import { Home } from '../pages/Home';
import { CarDetails } from '../pages/CarDetails';
import { SchedulingDetails } from '../pages/SchedulingDetails';
import { Scheduling } from '../pages/Scheduling';
import { SchedulingComplete } from '../pages/SchedulingComplete';
import { MyCars } from '../pages/MyCars';

const {Navigator, Screen} = createStackNavigator();

export const StackRoutes = () => {


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
                name="SchedulingComplete"
                component={SchedulingComplete}
            
            />
            <Screen 
                name="MyCars"
                component={MyCars}
            
            />

        </Navigator>
    );
}