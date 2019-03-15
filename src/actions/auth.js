import api from 'api'
import { toast } from 'react-toastify'

let loginAttempt = 0

/** Throttle logins by resetting loginAttempt after some time */
// eslint-disable-next-line
const loginResetHandler = setInterval(
    () => { loginAttempt = 0 },
    1000 * process.env.REACT_APP_LOGIN_TIMEOUT
)

// TODO: Disable throttling after login and re-enable after logout to prevent memory leaking

export const login = ({ email, password }) => {
    loginAttempt++
    return dispatch => {
        if(loginAttempt > process.env.REACT_APP_MAX_LOGIN_ATTEMPTS){
            toast.warn('Too many login attempts.')
            dispatch({ type : 'LOGIN_TIMEOUT' })
        }
        else{
            dispatch({ type : 'LOGIN_ATTEMPT' })
            api.post('/auth', { email, password })
            .then((res) => {
                if(res.status === 200 && res.data.token){
                    const { token } = res.data
                    loginAttempt = 0
                    dispatch({ type : 'LOGIN', token, email })
                }
            })
            .catch((err) => {
                const { message } = err.response.data
                toast.error(message || "Login failed.")
                dispatch({ type : 'LOGIN_FAILURE' })
            })
        }
    }
}    

export const logout = () => { 
    return dispatch => {
        dispatch({ type : 'LOGOUT' })
        toast('Thank you come again.')
        dispatch({ type : 'RESET_APP' })
    }
 }