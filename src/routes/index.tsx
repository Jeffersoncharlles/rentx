import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import { AppStackRoutes } from './app.stack.routes';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

export const Routes = () => {
    const {user} = useAuth();
    //pegando o user do nosso useAuth
    //verificando se ta logado
    return (
        <NavigationContainer>
           {user.id ? <AppTabRoutes /> : <AuthRoutes />}
         </NavigationContainer>
    );
}