import React,{useState} from 'react';
import { 
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    SafeAreaView
 } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import theme from '../../styles/theme';
import * as Yup from 'yup';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Footer,
    Main,
} from './styles';
import { useNavigation } from '@react-navigation/native';

export const Signin = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const navigation = useNavigation();


    const handleNewAccount = ()=>{
        navigation.navigate('SignUpFirstStep');

    }

    const handleSignIn = async ()=>{
        /* nao esquecer Yup e para validar*/

        try {
            //colocar dentro do try catch pq se nao passar
            //ele dispara
            const schema = Yup.object().shape({
                email:Yup.string()
                   .required('E-mail obrigatório')
                   .email('Digite um e-mail válido'),
                password:Yup.string()
                   .required('A senha é obrigatória')
            })
   
            await schema.validate({email,password});

            //fazer login
        } catch (error) {
            //ver se o erro e uma instancia do Yup
            if (error instanceof Yup.ValidationError) {
                
            } else {
                Alert.alert(
                    'Erro na autenticação',
                    'Ocorreu um erro ao fazer login'
                );
            }
        }
         
    }

    return(
        //</KeyboardAvoidingView> server para arrumar o teclado e ele ja contem flex 1
        //TouchableWithoutFeedback server para capturar o toque sem mostrar nada
        //Keyboard server para capturar o teclado
        //Keyboard.dismiss ao clicar no TouchableWithoutFeedback ele vai fechar o teclado 
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar 
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />
                    <Header>
                        
                        <Title>
                        Estamos{'\n'}
                        quase lá.
                        </Title>
                        <SubTitle>
                        Faça seu login para começar{'\n'}
                        uma experiência incrível.
                        </SubTitle>
                    </Header>

                    <Main>
                        <Input 
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email.trim()}
                            //.trim e por mim
                        />
                        <PasswordInput 
                            iconName="lock"
                            placeholder="Senha"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            value={password}
                        />
                        
                    </Main>

                    <Footer>
                        <Button 
                            title="Login"
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />
                        <Button 
                            title="Criar conta gratuita"
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                            color={theme.colors.background_secondary}
                            light
                        />
                    </Footer>
                    

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}