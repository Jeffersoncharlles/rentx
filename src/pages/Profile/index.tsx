import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';

import {
    Container,
    Header,
    HeadTop,
    LogoutButton,
    HeaderTitle,
    PhotoContainer,
    Photo,
    PhotoButton,
    ContentOptions,
    Options,
    Option,
    OptionTitle,
} from './styles';

export const Profile = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [option,setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

    const handleBack = ()=>{
        navigation.goBack();
    }

    const handleSinOut = ()=>{

    }

    const handleOptionChange = (optionSelected:'dataEdit' | 'passwordEdit')=>{
        setOption(optionSelected);
    }

    return(
        <Container>
            <Header>
                <HeadTop>
                    <BackButton color={theme.colors.shape} onPress={handleBack} />
                    <HeaderTitle>
                        Editar Perfil
                    </HeaderTitle>
                    <LogoutButton onPress={handleSinOut} >
                        <Feather 
                            name="power"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </LogoutButton>
                </HeadTop>
                <PhotoContainer>
                    <Photo source={{uri:'https://avatars.githubusercontent.com/u/26746739?v=4'}} />
                    <PhotoButton onPress={()=>{}} > 
                        <Feather 
                            name="camera"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </PhotoButton>
                </PhotoContainer>
            </Header>

            <ContentOptions>
                <Options>
                    <Option 
                        active={option === 'dataEdit'}
                        onPress={()=> handleOptionChange('dataEdit')}
                    >
                        <OptionTitle active={option === 'dataEdit'}>
                            Dados
                        </OptionTitle>
                    </Option>
                    <Option 
                        active={option === 'passwordEdit'}
                        onPress={()=> handleOptionChange('passwordEdit')}
                    >
                        <OptionTitle active={option === 'passwordEdit'}>
                            Trocar Senha
                        </OptionTitle>
                    </Option>
                </Options>
            </ContentOptions>


        </Container>
    );
}