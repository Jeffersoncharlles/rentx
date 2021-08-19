import React,{
    ReactNode,
} from "react";

import { AuthProvider } from './auth';

interface AppProviderProps{
    children: ReactNode;
}

//para se no futuro tiver mais hooks ja ta mais fácil usar
//para se no futuro quiser ter qualquer hook e so centralizar aqui
// e so exportar esse arquivo
const AppProvider = ({children}:AppProviderProps)=>{
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export {AppProvider};