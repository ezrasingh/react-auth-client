import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import getAction from 'tests/utils/getAction'
import thunk from 'redux-thunk'
import api from 'api'
import { register, profile, update } from 'actions/user'

const mockApi = new MockAdapter(api)
const mockStore = configureMockStore([ thunk ])

describe('user actions', () => {
    const store = mockStore()
    const user = { email: 'test@user.com', password: 'letmein', profile: { name: 'John Doe' } }
    beforeEach(() => {
        store.clearActions()
    })
    describe('register', () => {
        it('should process user registration', async () => {
            mockApi.onPost('/user').reply(200, { message: '' })
            store.dispatch(register({ ...user, confirm: user.password }))
            expect(await getAction(store, "REGISTERING_USER")).toEqual({ type: "REGISTERING_USER" })
            expect(await getAction(store, "USER_CREATED")).toEqual({ type: "USER_CREATED", message: '' })
        })
        it('should validate password confirmation', () => {
            const expectedActions = [ { type: "PASSWORD_CONFIRMATION_FAILED" } ]
            store.dispatch(register({ ...user, confirm: 'invalidpassword' }))
            expect(store.getActions()).toEqual(expectedActions)
        })
        it('should deny registration on server errors', async () => {
            mockApi.onPost('/user').reply(500, { message: '' })
            const expectedActions = [ { type: "REGISTERING_USER" }, { type: "REGISTRATION_FAILED", message: '' } ]
            store.dispatch(register({ ...user, confirm: user.password }))
            expect(await getAction(store, "REGISTERING_USER")).toEqual({ type: "REGISTERING_USER" })
            expect(await getAction(store, "REGISTRATION_FAILED")).toEqual({ type: "REGISTRATION_FAILED", message: '' })
        })
    })
})