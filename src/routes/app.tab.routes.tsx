import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { AppStackRoutes } from './app.stack.routes';
import { Home } from '../pages/Home';
import { MyCars } from '../pages/MyCars';


const {Navigator, Screen} = createBottomTabNavigator();

export const AppTabRoutes = () => {
    //jogando as stacks na home eu libero as duas para usar


    return (
        <Navigator>
            <Screen 
                name="Home"
                component={AppStackRoutes}
            />
            <Screen 
                name="Profile"
                component={Home}
            />
            <Screen 
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    );
}