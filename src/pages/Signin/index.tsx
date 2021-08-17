import React,{useState} from 'react';
import { 
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
 } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import theme from '../../styles/theme';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Footer,
    Main,
} from './styles';

export const Signin = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

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
                            onPress={()=>{}}
                            enabled={false}
                            loading={false}
                        />
                        <Button 
                            title="Criar conta gratuita"
                            onPress={()=>{}}
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