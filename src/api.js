import axios from 'axios'
import _ from 'lodash'

/**
 * A higher order function to mixin Api calls via Axios' interface
 */
const adapter = method => (route, payload=null) => {
    return axios({
        method,
        baseURL : process.env.REACT_APP_API_URL,
        url: route,
        data: payload,
        headers: { 
            'Access-Control-Allow-Origin' : '*',
            'Authorization' : sessionStorage.getItem('token')
        }
    })
}

/** 
 * Wrap REST methods to Api adapter
 * Example usage: api.get('/users') or api.post('/authenticate', { ...credentials }) 
 * */
const api = _([ "get", "post", "put", "delete" ])
			.zipObject()
			.mapValues((val, method) => adapter(method))
            .value()


export default api