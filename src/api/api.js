import axios from 'axios';
import errorHandler from '@/api/errorHandler'
import Service from '@/api/service'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'

/*
    using '...Service('/url/:id/')' in object provides methods:
        fetch
        get
        delete
        put
        save
 */

export const Post = {
    ...Service('/posts/:id/')
}
