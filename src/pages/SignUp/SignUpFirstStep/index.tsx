import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

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

            </Form>

        </Container>
    );
}