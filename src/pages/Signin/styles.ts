import styled from 'styled-components/native';
import theme from '../../styles/theme';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    padding: 0 24px;
    background-color: ${({theme} ) =>theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    margin-top: ${getStatusBarHeight()+116}px;

`;
export const Footer = styled.View`
    

`;
export const Main = styled.View`
    width: 100%;
    margin:64px 0;//emcima em embaixo 64 e 0 para os lados
`;

export const Title = styled.Text`
    font-family: ${({theme})=>theme.fonts.secondary_600} ;
    color: ${({theme})=>theme.colors.title};
    font-size: ${RFValue(40)}px;
`;
export const SubTitle = styled.Text`
    font-family: ${({theme})=>theme.fonts.primary_400} ;
    color: ${({theme})=>theme.colors.text};
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(25)}px;
    margin-top: 16px;
`;
