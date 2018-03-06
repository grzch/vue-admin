import axios from 'axios';
import errorHandler from '@/api/errorHandler'
import Service from '@/api/service'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

export const Post = {
    ...Service('/posts/:id/')
}

export const requestLogin = params => {
    return axios.post(`${base}/login`, params).then(res => res.data);
};
