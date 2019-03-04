export const defaultState = {
    get isLoggedIn(){
        return !!sessionStorage.getItem('token')
    }
}

const auth = (state = defaultState, action) => {
    switch(action.type){
        case 'LOGIN':
            sessionStorage.setItem('token', action.token)
            return { isLoggedIn: true }
        case 'LOGOUT':
            sessionStorage.removeItem('token')
            return { isLoggedIn: false }
        default:
            return state
    }
}

export default auth