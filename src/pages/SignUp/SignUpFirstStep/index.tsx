import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

import {
    Container,
    Header,
    Steps,
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

        </Container>
    );
}