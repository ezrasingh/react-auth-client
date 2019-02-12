import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import getAction from 'tests/utils/getAction'
import thunk from 'redux-thunk'
import api from 'api'
import { login, logout } from 'actions/auth'

const mockApi = new MockAdapter(api)
const mockStore = configureMockStore([ thunk ])
const user = { email: 'test@user.com', password: 'letmein' }

describe('login', () => {
    const store = mockStore()
    it('handles authentication and initializes an auth token', async () => {
        const token = 'mock-token'
        mockApi.onPost('/authenticate').reply(200, { token })
        store.dispatch(login(user))
        expect(await getAction(store, "LOGIN_ATTEMPT")).toEqual({ type: "LOGIN_ATTEMPT" })
        expect(await getAction(store, "LOGIN")).toEqual({ type: "LOGIN", token })
    })
})

describe('invalid login', () => {
    const store = mockStore()
    it('deflects authentication when server denies access', async () => {
        mockApi.onPost('/authenticate').reply(400)
        store.dispatch(login(user))
        expect(await getAction(store, "LOGIN_ATTEMPT")).toEqual({ type: "LOGIN_ATTEMPT" })
        expect(await getAction(store, "LOGIN_FAILURE")).toEqual({ type: "LOGIN_FAILURE" })
    })
})

describe('logout', () => {
    const store = mockStore()
    it('Deactivates session and resets application state', () => {
        const expectedActions = [ { type: "LOGOUT" }, { type: "RESET_APP" } ]
        store.dispatch(logout())
        expect(store.getActions()).toEqual(expectedActions)
    })
})