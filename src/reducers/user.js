
export const defaultState =  { email : null, profile: {} }

const user = (state = defaultState, action) => {
    switch(action.type){
        case 'USER_CREATED':
            // NOTE: Setting email to 'false' rather than null is an indicator that user creation succeeded
            // This subtle change has the neat benefit of preventing anonymous users
            // from creating multiple accounts
            return { ...state, email: false }
        case 'USER_PROFILE':
            return { ...action.user }
        case 'PROFILE_UPDATED':
            return { ...state, profile: action.profile }
        default:
            return state
    }
}

export default user