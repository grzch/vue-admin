import axios from 'axios';

export default function (url) {
    const prepareURL = (urlParams) => {
        if (typeof urlParams !== 'object') {
            urlParams = {
                id: urlParams
            }
        }

        const convertURLFragment = fragment => fragment.startsWith(':') ? urlParams[fragment.slice(1)] : fragment
        return url.split('/').map(convertURLFragment).join('/').replace('//', '/')
    }
    return {
        query: (urlParams, payload) => {
            return axios.get(prepareURL(urlParams), payload)
        },
        put: (urlParams, payload) => {
            return axios.put(prepareURL(urlParams), payload)
        },
        get: (urlParams, payload) => {
            return axios.get(prepareURL(urlParams), payload)
        },
        delete: (urlParams) => {
            return axios.delete(prepareURL(urlParams))
        }
    }
}
