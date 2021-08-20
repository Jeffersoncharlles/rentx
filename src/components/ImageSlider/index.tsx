import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';

import {
    Container,
    ImageIndexes,
    CarImageContainer,
    CarImage,
} from './styles';

interface Props {
    imagesUrl: {
        id:string;
        photo:string;
    }[];
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export const ImageSlider = ({imagesUrl}:Props) => {
    const [imageIndex, setImageIndex] = useState(0);


    const indexChanged = useRef((info:ChangeImageProps)=> {
        //pego o info dentro o item na primeira posição e pegar o index exclamação para nao ser null
        const index = info.viewableItems[0].index!;
       setImageIndex(index);
    }); 

    

    return (
        <Container>
            <ImageIndexes>
                {
                    imagesUrl.map((item,index)=>(
                        <Bullet 
                            key={String(item.id)}
                            active={index === imageIndex} 
                        />
                    ))
                    

                }
                
            </ImageIndexes>
            
                <FlatList 
                    data={imagesUrl}
                    keyExtractor={item =>item.id}
                    renderItem={({item})=>(
                        <CarImageContainer>
                            <CarImage
                            source={{uri:item.photo}}
                            resizeMode="contain"
                            />
                        </CarImageContainer>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                   onViewableItemsChanged={indexChanged.current}
                />
                
            
         </Container>
    );
}