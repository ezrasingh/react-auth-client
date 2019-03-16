import api from 'api'
import { toast } from 'react-toastify'

export const register = ({ email, name, password, confirm }) => {
    return dispatch => {
        if(password !== confirm){
            toast.error('Passwords do not match.')
            dispatch({ type : 'PASSWORD_CONFIRMATION_FAILED' })
        }
        else{
            dispatch({ type : 'REGISTERING_USER' })
            api.post('/user', { email, name, password, confirm })
            .then((res) => {
                const { message } = res.data
                if(res.status === 200){
                    toast.success(`Confirmation email sent to ${email}.`)
                    dispatch({ type : 'USER_CREATED', message })
                }
            })
            .catch((err) => {
                const { message } = err.response.data
                if(err.response.status === 401){
                    toast.warn("A user with that email already has an account.")  
                }
                else{ toast.error(message) }
                dispatch({ type: 'REGISTRATION_FAILED', message })
            })
        }
    }
}

export const profile = () => {
    return dispatch => {
        dispatch({ type : 'FETCHING_PROFILE' })
        api.get('/user')
        .then((res) => {
            const { email, profile } = res.data
            dispatch({ type : 'USER_PROFILE', user : { email, profile } })
        })
        .catch((err) => {
            toast.warn('Login required.')
            dispatch({ type: 'LOGIN_REQUIRED' })
        })
    }
}

export const updateProfile = ({ name }) => {
    return dispatch => {
        dispatch({ type: 'UPDATING_PROFILE' })
        api.put('/user', { name })
        .then((res) => {
            const { message } = res.data
            toast.success(message || "Profile updated.")
            dispatch({ 
                type: 'PROFILE_UPDATED', 
                message, 
                profile: { name } 
            })
        })
        .catch((err) => {
            toast.warn('Login required.')
            dispatch({ type: 'LOGIN_REQUIRED' })
        })
    }
}

export const updateEmail = ({ new_email, password }) => {
    return dispatch => {
        dispatch({ type: 'UPDATING_EMAIL' })
        api.patch("/user", { new_email, password })
        .then((res) => {
            const { message } = res.data
            if(res.status === 200){
                toast.success(message || "Email updated.")
                dispatch({ type: 'EMAIL_UPDATED', new_email })
            }
        })
        .catch((err) => {
            const { message } = err.response.data
            if(err.response.status === 401){
                toast.warn(message || "User with that email already exists.")
            }
            else{
                console.error(err)
                toast.error("Server could not process update")
            }
            dispatch({ type: 'UPDATE_EMAIL_FAILED' })
        })
    }
}

export const deactivateAccount = ({ password }) => {
    return dispatch => {
        dispatch({  type: 'DEACTIVATING_USER'})
        api.delete("/user", { data: { password } })
        .then((res) => {
            toast("Account was deactivated")
            toast.info("Log back in to reactivate account")
            dispatch({ type: 'USER_DEACTIVATED' })
            dispatch({ type: 'LOGOUT' })
            dispatch({ type: 'RESET_APP' })
        })
        .catch((err) => {
            toast.error("Could not deactivate account")
            dispatch({ type: 'USER_DEACTIVATION_FAILED' })
        })
    }
}