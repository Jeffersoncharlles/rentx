import axios from 'axios';

const api = axios.create({
    baseURL:'http://10.10.10.187:3333',
});

export  {api};