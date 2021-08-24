
import React,{useState} from 'react';
import {KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Feather } from '@expo/vector-icons';
import { Button } from '../../components/Button';

import * as Yup from 'yup';

import * as ImagePicker from 'expo-image-picker';

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
    Section,
} from './styles';

import { useAuth } from '../../hooks/auth';
import { useNetInfo } from '@react-native-community/netinfo';

export const Profile = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const {user, signOut,UpdateUser} = useAuth();
    const netInfo = useNetInfo();

    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);
    const [password, setPassword] = useState('');
    const [option,setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
    const handleBack = ()=>{
        navigation.goBack();
    }
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
    const handleSignOut = async ()=>{
        Alert.alert(
            'Tem certeza?', 
            'Se voce sair , irá precisa de internet para-se conecta-se novamente.',
            [
                {
                    text:'Cancelar',
                    onPress:()=>{},
                    style:"cancel"
                },
                {
                    text:'Confirmar',
                    onPress:()=>signOut(),
                    
                }

            ]
        )
        
    }
/*===============================================================================*/
/*===============================================================================*/
    const handleOptionChange = (optionSelected:'dataEdit' | 'passwordEdit')=>{
        if (netInfo.isConnected === false && optionSelected ==='passwordEdit') {
            Alert.alert('Para mudar a senha, conecte-se a internet');
        }else{
            setOption(optionSelected);
        }
        
    }
/*===============================================================================*/
/*===============================================================================*/
    const handleSelectAvatar =async ()=>{
        //to pegando a imagem da galeria 
        //pegando so imagem
        // tamanho e qualidade e liberando para editar
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,4],
            quality:1,
        });

        if (result.cancelled) {
            return;   
        }

        if (result.uri) {
            setAvatar(result.uri)
        }
    }
/*===============================================================================*/
/*===============================================================================*/
    const handleProfileUpdate = async ()=> {
        try {
            const schema = Yup.object().shape({
                driverLicense:Yup.string().required('CNH é obrigatório'),
                name:Yup.string().required('Nome e obrigatório')
            });

            const data = {name,driverLicense};
            await schema.validate(data);

            await UpdateUser({
                id:user.id,
                user_id:user.user_id,
                email:user.email,
                name,
                driver_license:driverLicense,
                avatar,
                token:user.token
            });

            Alert.alert('Perfil Atualizado');

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            }else{
                Alert.alert('Nao foi possível atualizar o perfil');
            }
            
        }
    }
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
    return(
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeadTop>
                            <BackButton color={theme.colors.shape} onPress={handleBack} />
                            <HeaderTitle>
                                Editar Perfil
                            </HeaderTitle>
                            <LogoutButton onPress={handleSignOut} >
                                <Feather 
                                    name="power"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </LogoutButton>
                        </HeadTop>
                        <PhotoContainer>
                           { !!avatar && <Photo source={{uri:avatar}} />}
                            <PhotoButton onPress={handleSelectAvatar} > 
                                <Feather 
                                    name="camera"
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>

                    <ContentOptions style={{marginBottom:useBottomTabBarHeight()}}>
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
                        { option === 'dataEdit' ?
                            <Section >
                                <Input 
                                    iconName="user"
                                    placeholder="nome"
                                    autoCorrect={false}
                                    defaultValue={user.name}
                                    onChangeText={setName}
                                />
                                <Input 
                                    iconName="mail"
                                    editable={false}
                                    defaultValue={user.email}
                                />
                                <Input 
                                    iconName="credit-card"
                                    placeholder="CNH"
                                    keyboardType="numeric"
                                    defaultValue={user.driver_license}
                                    onChangeText={setDriverLicense}
                                />
                            </Section>
                            :
                            <Section >
                                <PasswordInput 
                                    iconName="lock"
                                    placeholder="Senha Atual"
                                />
                                <PasswordInput 
                                    iconName="lock"
                                    placeholder="Nova Senha"
                                />
                                <PasswordInput 
                                    iconName="lock"
                                    placeholder="Digite Novamente"
                                />
                            </Section>
                        }
                        <Button 
                            title="Salvar Alterações"
                            onPress={handleProfileUpdate}
                        />
                    </ContentOptions>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}