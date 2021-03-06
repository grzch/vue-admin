import axios from 'axios';

export default function (url) {
    const prepareURL = (urlParams) => {
        urlParams = urlParams || {}
        if (typeof urlParams !== 'object') {
            urlParams = {
                id: urlParams
            }
        }

        const convertURLFragment = fragment => fragment.startsWith(':') ? urlParams[fragment.slice(1)] : fragment
        return url.split('/').map(convertURLFragment).join('/').replace('//', '/')
    }
    return {
        fetch: (urlParams, payload) => {
            return axios.get(prepareURL(urlParams), payload)
        },
        update: (urlParams, payload) => {
            return axios.put(prepareURL(urlParams), payload)
        },
        get: (urlParams, payload) => {
            return axios.get(prepareURL(urlParams), payload)
        },
        save: (payload) => {
            return axios.post(prepareURL(), payload)
        },
        delete: (urlParams) => {
            return axios.delete(prepareURL(urlParams))
        }
    }
}
