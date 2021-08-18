import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
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

export const SignUpSecondStep = () => {

    const theme = useTheme();

  const navigation =  useNavigation();

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
                        />
                        <PasswordInput 
                            iconName="lock"
                            placeholder="Repetir Senha"
                        />
                    </Form>
                    <Button 
                        title="Próximo"
                        color={theme.colors.success}
                    />

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}