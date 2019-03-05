import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import getAction from 'tests/utils/getAction'
import thunk from 'redux-thunk'
import api from 'api'
import { login, logout } from 'actions/auth'

const mockApi = new MockAdapter(api)
const mockStore = configureMockStore([ thunk ])

describe('auth actions', () => {
    const store = mockStore()
    const user = { email: 'test@user.com', password: 'letmein' }
    beforeEach(() => {
        store.clearActions()
    })
    describe('login', () => {
        it('should handle auth and init an auth token', async () => {
            const token = 'mock-token'
            mockApi.onPost('/authenticate').reply(200, { token })
            store.dispatch(login(user))
            expect(await getAction(store, "LOGIN_ATTEMPT")).toEqual({ type: "LOGIN_ATTEMPT" })
            expect(await getAction(store, "LOGIN")).toEqual({ type: "LOGIN", token })
        })
        it('should deflect auth when server denies access', async () => {
            mockApi.onPost('/authenticate').reply(400)
            store.dispatch(login(user))
            expect(await getAction(store, "LOGIN_ATTEMPT")).toEqual({ type: "LOGIN_ATTEMPT" })
            expect(await getAction(store, "LOGIN_FAILURE")).toEqual({ type: "LOGIN_FAILURE" })
        })
    })
    describe('logout', () => {
        it('should dereference session and reset app state', () => {
            const expectedActions = [ { type: "LOGOUT" }, { type: "RESET_APP" } ]
            store.dispatch(logout())
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})