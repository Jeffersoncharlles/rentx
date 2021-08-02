import React from 'react';
import { FlatList } from 'react-native';

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
                {
                    imagesUrl.map((item,index)=>(
                        <ImageIndex 
                            key={String(index)}
                            active={true} 
                        />
                    ))
                    

                }
                
            </ImageIndexes>
            
                <FlatList 
                    data={imagesUrl}
                    keyExtractor={key =>key}
                    renderItem={({item})=>(
                        <CarImageContainer>
                            <CarImage
                            source={{uri:item}}
                            resizeMode="contain"
                            />
                        </CarImageContainer>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                
            
         </Container>
    );
}