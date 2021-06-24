import React from 'react';

import {
    Container,
    ImageIndexes,
    ImageIndex,
    CarImageContainer,
    CarImage,
} from './styles';

interface Props {
    imagesUrl: string[];
}

export const ImageSlider = ({imagesUrl}:Props) => {
    return (
        <Container>
            <ImageIndexes>
                <ImageIndex active={true} />
                <ImageIndex active={false} />
                <ImageIndex active={false} />
                <ImageIndex active={false} />
            </ImageIndexes>
            <CarImageContainer>
                <CarImage
                    source={{uri:imagesUrl[0]}}
                    resizeMode="contain"
                />
            </CarImageContainer>
         </Container>
    );
}