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

export const updatePassword = ({ new_password, confirm, password }) => {
    return dispatch => {
        dispatch({ type: 'UPDATING_PASSWORD' })
        api.put("/auth", { new_password, confirm, password })
        .then((res) => {
            const { message } = res.data
            toast.success(message || "Password updated.")
            dispatch({ type: 'PASSWORD_UPDATED' })
        })
        .catch((err) => {
            const { message } = err.response.data
            if(err.response.status === 401){
                toast.warn(message || "Either user already exist or form is invalid")
            }
            else{
                console.error(err)
                toast.error("Server could not process update")
            }
            dispatch({ type: 'UPDATE_PASSWORD_FAILED' })
        })
    }
}


export const deleteAccount = ({ password }) => {
    return dispatch => {
        dispatch({ type: 'DELETING_ACCOUNT' })
        api.delete("/auth", { data: { password } })
        .then((res) => {
            const { message } = res.data
            if(res.status === 200){
                toast(message || "Account was deleted")
                dispatch({ type: 'ACCOUNT_DELETED' })
                dispatch({ type: 'LOGOUT' })
                dispatch({ type: 'RESET_APP' })   
            }
        })
        .catch((err) => {
            toast.error("Could not delete account")
            dispatch({ type: 'ACCOUNT_DELETION_FAILED' })
        })
    }
} 
