import { addDays } from 'date-fns';
import {Platform} from 'react-native';

export const getPlatformDate = (date: Date) =>{
    // if (Platform.OS === 'ios') {
    //    return  addDays(date,1) ;
    // }else{
    //     return  addDays(date,1);
    // }

    return  Platform.OS === 'ios' ?  addDays(date,1) :  addDays(date,1) ;
}