import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect
} from "react";
import { api } from "../services/api";



import {database} from '../database';
import {User as ModelUser} from '../database/model/User';

//dados do usuário
interface User {
    id:string;
    user_id:string;
    email:string;
    name:string;
    driver_license: string;
    avatar: string;
    token: string;
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
    signOut: () => Promise<void>;
}

//interface do authProvider para tipo o filho
interface AuthProviderProps{
    children: ReactNode;
}

//criar contexto do tipo AuthContextData começa com {} do tipo AuthContextData
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//ele precisa receber um filho que na verdade vai ser as rotas
//criar o estado de autenticação que vai ser tipo User começa como objeto vazio
const AuthProvider = ({children}: AuthProviderProps)=>{
    const [data, setData] = useState<User>({} as User)

    //criar função signin que recebe email e password de SignInCredentials
    const signIn = async ({email, password}: SignInCredentials) => {
        //colocar dentro do bloco try catch para evitar crash
        try {

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

            //seleciono minha tabela
            //tipo ele pela model
            //para poder vim toda tipagem
            //tem que colocar o .write para poder gravar
            const newUser = await database.write(async() => {
                const userCollection = await database.get<ModelUser>('users')
                    .create((newUser)=>{
                        newUser.user_id = user.id,
                        newUser.name = user.name,
                        newUser.email = user.email,
                        newUser.driver_license = user.driver_license,
                        newUser.avatar = user.avatar,
                        newUser.token = token
                        }
                    );

            })
            

            //depois de salvar no banco de dados eu seto no estados
    
            setData({...user, token});

            
        } catch (error) {
            //pegar o erro e lançar para quem chamou tratar ele
            throw new Error(error);

        }

        
    }

    const signOut = async ()=>{
        try {
            
            await database.write(async()=>{
                const userSelected = database.get<ModelUser>('users').find(data.id);
                (await userSelected).destroyPermanently();

            });

            setData({} as User);
            
        } catch (error) {
            //pegar o erro e lançar para quem chamou tratar ele
            throw new Error(error);
        }
    }

    useEffect(()=>{
        const loadUserData = async ()=>{
            const userCollection = database.get<ModelUser>('users');
            const response = await userCollection.query().fetch();

            if (response.length > 0) {
                //as unknown as User forcando tipagem
              const userData =   response[0]._raw as unknown as User;
              api.defaults.headers.authorization = `Bearer ${userData.token}`;
              setData(userData);
            }
            
        }
        loadUserData();

    },[]);


    //authProvider vai prover para todos os filhos 
    //e como se tivesse colocando rotas em vez de filhos
    //assim consigo acessar de todas as rotas o dados do usuário
    //e o signIn
    return (
        <AuthContext.Provider 
            value={{user:data,signIn,signOut}}
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