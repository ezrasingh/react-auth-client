
export const defaultState =  { email : null, profile: {} }

const user = (state = defaultState, action) => {
    switch(action.type){
        case 'USER_PROFILE':
            return { ...action.user }
        case 'PROFILE_UPDATED':
            return { ...state, profile: action.profile }
        default:
            return state
    }
}

export default user