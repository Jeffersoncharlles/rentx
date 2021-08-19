import React, {
    createContext,
    useState,
    useContext,
    ReactNode
} from "react";
import { api } from "../services/api";

//dados do usuário
interface User {
    id:string;
    email:string;
    name:string;
    driver_license: string;
    avatar: string;
}

//armazenar no estado o token e o usuário
interface AuthState {
    token: string;
    user: User;
}

//tipo de credenciais
interface SignInCredentials {
    email: string;
    password: string;
}

//compartilhar com minha aplicação através do contexto
//signIn: () => Promise<void>; ou seja ela nao vai retornar nada mais e uma promise
interface AuthContextData {
    user:User;
    signIn: (credentials: SignInCredentials) => Promise<void>;
}

//interface do authProvider para tipo o filho
interface AuthProviderProps{
    children: ReactNode;
}

//criar contexto do tipo AuthContextData começa com {} do tipo AuthContextData
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//ele precisa receber um filho que na verdade vai ser as rotas
//criar o estado de autenticação que vai ser tipo AuthState começa como objeto vazio
const AuthProvider = ({children}: AuthProviderProps)=>{
    const [data, setData] = useState<AuthState>({} as AuthState)

    //criar função signin que recebe email e password de SignInCredentials
    const signIn = async ({email, password}: SignInCredentials) => {
        const response = await api.post('/sessions',{
            email,
            password
        });

        //console.log(response.data);
        //resposta do dados vem em data
        const {token, user} = response.data;

        //setar no cabeçalho em todas a requisição
        //inf de authorization em todas requisição Bearer
        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({token,user});
    }

    //authProvider vai prover para todos os filhos 
    //e como se tivesse colocando rotas em vez de filhos
    //assim consigo acessar de todas as rotas o dados do usuário
    //e o signIn
    return (
        <AuthContext.Provider 
            value={{user:data.user,signIn}}
        >
            {children}
        </AuthContext.Provider>
    )
}

//aqui vou criar o hook para usar isso em qualquer interface
const useAuth = (): AuthContextData =>{
    //criar o context usando o userContext passando AuthContext
    const context = useContext(AuthContext);

    return context
    //retorna o context
}

export {AuthProvider, useAuth}
//exportando para usar em qualquer lugar