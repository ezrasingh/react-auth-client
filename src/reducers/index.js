import { combineReducers } from 'redux'
import auth, { defaultState as authDefaultState } from './auth'
import user, { defaultState as userDefaultState } from './user'

export const defaultState = { 
    auth: authDefaultState,
    user: userDefaultState
}

const appReducer = combineReducers({ auth, user })

const rootReducer = (state, action) => {
    if(action.type === 'RESET_APP'){
        state = defaultState
    }
    return appReducer(state, action)
}

export default rootReducer