import React,{useState, useEffect} from 'react';
import CarDTO from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
    Container,
} from './styles';

export const MyCars = () => {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchCars  = async ()=>{
            try {
                const resp = await api.get('/schedules_byuser?user_id=6');
                console.log(resp.data);
                setCars(resp.data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchCars();
    },[])

    return (
        <Container>

         </Container>
    );
}