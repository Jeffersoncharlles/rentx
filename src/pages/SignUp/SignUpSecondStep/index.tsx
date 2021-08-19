import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import { Confirmation } from '../../Confirmation';
import { useTheme } from 'styled-components';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,

} from './styles';
import { useState } from 'react';
import { Alert } from 'react-native';

interface Params {
    user:{
       name: string;
       email: string;
       driverLicense: string; 
    }
}


export const SignUpSecondStep = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const theme = useTheme();

  const navigation =  useNavigation();


  const route = useRoute();
  //cria interface com os parâmetros 
  //pegar o routes e puxa os params para aqui
  //jogo o objeto user dentro do objeto
  const {user} = route.params as Params;

  const handleRegister = ()=>{
      if (!password || !passwordConfirm) {
          return Alert.alert('Informe a senha e a confirmação');
      }
      if (password != passwordConfirm) {
        return Alert.alert('As senhas não são iguais');
      }

      //Enviar para api e cadastrar 
      

      //chamar a tela de cadastrado
      navigation.navigate('Confirmation',{
        title: 'Conta Criada!', 
        message:`Agora é só fazer login\n e aproveitar`,
        nextScreenRoute:'Signin',
      });
  }


  const handleBackButton = ()=>{
      navigation.goBack();
  }

    return(
        //</KeyboardAvoidingView> server para arrumar o teclado e ele ja contem flex 1
        //TouchableWithoutFeedback server para capturar o toque sem mostrar nada
        //Keyboard server para capturar o teclado
        //Keyboard.dismiss ao clicar no TouchableWithoutFeedback ele vai fechar o teclado 
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBackButton}/>
                        <Steps>
                            <Bullet  />
                            <Bullet active/>
                        </Steps>
                    </Header>
                    <Title>
                        Crie Sua {'\n'}conta
                    </Title>
                    <SubTitle>
                        Faça seu cadastro de {'\n'}
                        forma rápida e fácil
                    </SubTitle>

                    <Form>
                        <FormTitle>
                            2. Senha
                        </FormTitle>
                        <PasswordInput 
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                        <PasswordInput 
                            iconName="lock"
                            placeholder="Repetir Senha"
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </Form>
                    <Button 
                        title="Próximo"
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}