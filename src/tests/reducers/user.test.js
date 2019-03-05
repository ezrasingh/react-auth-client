import { default as dispatch, defaultState } from 'reducers/user'

describe('user reducer', () => {
    const user = { email: 'tester@user.com', profile: { avatar: null, name: 'John Doe' } }
    describe('user creation', () => {
        it('should toggle email from null to false for ternary logic', () => {
            expect(defaultState.email).toBe(null)
            const { email } = dispatch(null, { type: "USER_CREATED" })
            expect(email).toBe(false)
        })
    })
    describe('user profile', () => {
        it('should load the user state', () => {
            const state = dispatch(null, { type: "USER_PROFILE", user })
            expect(state).toEqual(user)
        })
    })
    describe('profile update', () => {
        it('should update the profile state', () => {
            expect(defaultState.profile).toEqual({ avatar: null, name: "" })
            const { profile } = dispatch(null, { type: "PROFILE_UPDATED", profile: user.profile })
            expect(profile).toEqual(user.profile)
        })
    })
    describe('user login', () => {
        it('should update the email state', () => {
            expect(defaultState.email).toBe(null)
            const { email } = dispatch(null, { type: "LOGIN", email: user.email })
            expect(email).toEqual(user.email)
        })
    })
})