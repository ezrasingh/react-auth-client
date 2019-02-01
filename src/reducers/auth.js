
/** NOTE: 
 * This is implemented as an implicit function call
 * to keep state concurrent with sessionStorage 
 * */
export const defaultState = (() => { 
    return { isLoggedIn: !!sessionStorage.getItem('token') }
})()

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