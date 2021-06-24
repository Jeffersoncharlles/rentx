import React from 'react';
import {BackButton} from '../../components/BackButton';
import {ImageSlider} from '../../components/ImageSlider';

import {
    Container,
    Header,
} from './styles';

export const CarDetails = () => {
    return (
        <Container>
            <Header>
                <BackButton onPress={()=>{}}/>
            </Header>
            <ImageSlider 
                imagesUrl={['https://freepngimg.com/thumb/porsche/1-2-porsche-free-png-image-thumb.png']} 
            />
         </Container>
    );
}