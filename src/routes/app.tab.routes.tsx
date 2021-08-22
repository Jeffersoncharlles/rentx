import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import HomeSvg from '../assets/home.svg';
import CarrosSvg from '../assets/carros.svg';
import PerfilSvg from '../assets/perfil.svg';


import { AppStackRoutes } from './app.stack.routes';
import { MyCars } from '../pages/MyCars';
import { Profile } from '../pages/Profile';



const {Navigator, Screen} = createBottomTabNavigator();

export const AppTabRoutes = () => {
    //jogando as stacks na home eu libero as duas para usar
    const theme = useTheme()


    //activeTintColor cor selecionado
    //inactiveTintColor cor quando nada ta selecionado
    //showLabel nao aparecer textos
    //tabBarIcon acessa a cor definida active ou inactive
    // para pegar a cor tem que tirar o fill do svg
    return (
        <Navigator
            tabBarOptions={{
                activeTintColor: theme.colors.main,
                inactiveTintColor: theme.colors.text_details,
                showLabel:false,
                style:{
                    paddingVertical:Platform.OS === 'ios'? 20:0,
                    height: 78,
                    backgroundColor:theme.colors.background_primary
                }
            }}
        >
            <Screen 
                name="Home"
                component={AppStackRoutes}
                options={{
                    tabBarIcon: ({color})=>(
                        <HomeSvg width={24} height={24} fill={color}/>
                    )
                }}
            />
            <Screen 
                name="MyCars"
                component={MyCars}
                options={{
                    tabBarIcon: ({color})=>(
                        <CarrosSvg width={24} height={24} fill={color}/>
                    )
                }}
            />
            <Screen 
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({color})=>(
                        <PerfilSvg width={24} height={24} fill={color}/>
                    )
                }}
            />

        </Navigator>
    );
}