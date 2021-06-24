import React from 'react';
import {BackButton} from '../../components/BackButton';
import {ImageSlider} from '../../components/ImageSlider';

import {
    Container,
    Header,
    CarImages,
} from './styles';

export const CarDetails = () => {
    return (
        <Container>
            <Header>
                <BackButton onPress={()=>{}}/>
            </Header>
            <CarImages>
                <ImageSlider 
                    imagesUrl={['https://freepngimg.com/thumb/porsche/1-2-porsche-free-png-image-thumb.png']} 
                />
            </CarImages>
            
         </Container>
    );
}