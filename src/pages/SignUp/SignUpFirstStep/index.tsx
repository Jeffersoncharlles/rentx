import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
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
import * as Yup from 'yup';

export const SignUpFirstStep = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [driverLicense,setDriverLicense] = useState('');

  const navigation =  useNavigation();

  const handleBackButton = ()=>{
      navigation.goBack();
  }
  const handleNextButton = async ()=>{
      try {

        //aqui eu crio o esquema de como quero a validação em objeto
        const schema = Yup.object().shape({
            driverLicense: Yup.string()
                .required('CNH é obrigatório')
                .min(11),
            email: Yup.string()
                .email('E-mail inválido')
                .required('E-mail é obrigatório'),
            name: Yup.string()
                .required('Nome é obrigatório'),
        });

        //aqui eu crio o objeto com os valores
        const data = {name , email, driverLicense};

        //aqui eu passo o esquema para validar com os objetos data
        await schema.validate(data);

        navigation.navigate('SignUpSecondStep',{user: data});
      } catch (error) {
          if (error instanceof Yup.ValidationError) {
              Alert.alert('Opa', error.message);
          } else {
              
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
                            onChangeText={setName}
                            value={name}
                        />
                        <Input 
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            value={email}
                        />
                        <Input 
                            iconName="credit-card"
                            placeholder="CNH"
                            keyboardType="numeric"
                            //onChangeText={(value)=> setDriverLicense(Number(value))}
                            onChangeText={setDriverLicense}
                            value={driverLicense}
                        />

                    </Form>
                    <Button 
                        title="Próximo"
                        onPress={handleNextButton}
                    />

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}