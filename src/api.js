import axios from 'axios'

/**
 * Axios configuration
 */
const api = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
    headers: { 
        'Access-Control-Allow-Origin' : '*',
        'Authorization' : null
    }
})

// Inject concurrent auth token into each request
api.interceptors.request.use((config) => {
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
}, err => Promise.reject(err))


export default api