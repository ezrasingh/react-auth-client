import api from 'api'
import { toast } from 'react-toastify'

export const register = ({ email, password, confirm }) => {
    return dispatch => {
        if(password !== confirm){
            toast.error('Passwords do not match.')
            dispatch({ type : 'PASSWORD_CONFIRMATION_FAILED' })
        }
        else{
            dispatch({ type : 'REGISTERING_USER' })
            api.post('/user', { email, password, confirm })
            .then((res) => {
                const { message } = res.data
                if(res.status === 200){
                    toast.success('Account registered!')
                    dispatch({ type : 'USER_CREATED', message })
                }
            })
            .catch((err) => {
                const { message } = err.response.data
                toast.error(message)
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

export const update = ({ name }) => {
    return dispatch => {
        dispatch({ type: 'UPDATING_PROFILE' })
        api.put('/user', { name })
        .then((res) => {
            const { message } = res.data
            toast('Profile updated.')
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