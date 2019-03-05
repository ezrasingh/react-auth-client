import { default as dispatch } from 'reducers/auth'

describe('auth reducer', () => {
    describe('login', () => {
        it('should save auth token in sessionStorage', () => {
            const token = 'test-token'
            const { isLoggedIn } = dispatch({}, { type: 'LOGIN', token })
            expect(sessionStorage.setItem).toHaveBeenLastCalledWith('token', token)
            expect(sessionStorage.__STORE__['token']).toBe(token)
            expect(isLoggedIn).toBe(true)
        })
    })
    describe('logout', () => {
        it('should derefence auth token in sessionStorage', () => {
            sessionStorage.setItem('token', 'test-token')
            const { isLoggedIn } = dispatch({}, { type: 'LOGOUT' })
            expect(sessionStorage.removeItem).toHaveBeenCalledTimes(1)
            expect(sessionStorage.__STORE__['token']).toBeFalsy()
            expect(isLoggedIn).toBe(false)
        })
    })
})