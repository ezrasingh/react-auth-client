import api from 'api'

export const register = ({ email, password, confirm }) => {
    return dispatch => {
        if(password !== confirm){
            dispatch({ type : 'PASSWORD_CONFIRMATION_FAILED' })
        }
        else{
            dispatch({ type : 'REGISTERING_USER' })
            api.post('/user', {data: { email, password, confirm }})
            .then((res) => {
                const { message } = res.data
                if(res.status === 200){
                    dispatch({ type : 'USER_CREATED', message })
                }
            })
            .catch((err) => {
                const { message } = err.response.data
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
            dispatch({ type: 'LOGIN_REQUIRED' })
        })
    }
}

export const update = ({ name }) => {
    return dispatch => {
        dispatch({ type: 'UPDATING_PROFILE' })
        api.put('/user', {data: { name }})
        .then((res) => {
            const { message } = res.data
            dispatch({ 
                type: 'PROFILE_UPDATED', 
                message, 
                profile: { name } 
            })
        })
        .catch((err) => {
            dispatch({ type: 'LOGIN_REQUIRED' })
        })
    }
}