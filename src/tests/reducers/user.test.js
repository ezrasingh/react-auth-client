import { default as dispatch, defaultState } from 'reducers/user'

describe('user reducer', () => {
    const user = { email: 'tester@user.com', profile: { name: 'John Doe' } }
    describe('user creation', () => {
        it('should flag email with false for ternary logic', () => {
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
            expect(defaultState.profile).toEqual({})
            const { profile } = dispatch(null, { type: "PROFILE_UPDATED", profile: user.profile })
            expect(profile).toEqual(user.profile)
        })
    })
})