import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
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

export const SignUpFirstStep = () => {

  const navigation =  useNavigation();

  const handleBackButton = ()=>{
      navigation.goBack();
  }

    return(
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBackButton}/>
                        <Steps>
                            <Bullet active />
                            <Bullet />
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
                            1. Dados
                        </FormTitle>
                        <Input 
                            iconName="user"
                            placeholder="Nome"
                        />
                        <Input 
                            iconName="mail"
                            placeholder="E-mail"
                        />
                        <Input 
                            iconName="credit-card"
                            placeholder="CNH"
                        />

                    </Form>
                    <Button 
                        title="Próximo"
                    />

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}