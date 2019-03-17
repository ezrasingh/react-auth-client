import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'
import getAction from 'tests/utils/getAction'
import thunk from 'redux-thunk'
import api from 'api'
import { 
    register, 
    profile,
    updateProfile,
    updateEmail,
    deactivateAccount
} from 'actions/user'

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
            store.dispatch(register({ ...user, confirm: user.password }))
            expect(await getAction(store, "REGISTERING_USER")).toEqual({ type: "REGISTERING_USER" })
            expect(await getAction(store, "REGISTRATION_FAILED")).toEqual({ type: "REGISTRATION_FAILED", message: '' })
        })
    })
    describe('profile', () => {
        it('should load user profile from API response', async () => {
            mockApi.onGet('/user').reply(200, { email: user.email, profile: user.profile })
            store.dispatch(profile())
            expect(await getAction(store, "FETCHING_PROFILE")).toEqual({ type: "FETCHING_PROFILE" })
            expect(await getAction(store, "USER_PROFILE")).toEqual({ type: "USER_PROFILE", user: { email: user.email, profile: user.profile } })
        })
        it('should deny access if API permits', async () => {
            mockApi.onGet('/user').reply(400)
            store.dispatch(profile())
            expect(await getAction(store, "FETCHING_PROFILE")).toEqual({ type: "FETCHING_PROFILE" })
            expect(await getAction(store, "LOGIN_REQUIRED")).toEqual({ type: "LOGIN_REQUIRED" })
        })
    })
    describe('update profile', () => {
        it('should push profile updates to API', async () => {
            mockApi.onPut('/user').reply(200, { message: 'MOCK-SERVER-MSG' })
            store.dispatch(updateProfile({ name: user.profile.name }))
            expect(await getAction(store, "UPDATING_PROFILE")).toEqual({ type: "UPDATING_PROFILE" })
            expect(await getAction(store, "PROFILE_UPDATED")).toEqual({ type: "PROFILE_UPDATED", profile:  {...user.profile} })
        })
        it('should deny access if API permits', async () => {
            mockApi.onPut('/user').reply(400)
            store.dispatch(updateProfile({ name: user.profile.name }))
            expect(await getAction(store, "UPDATING_PROFILE")).toEqual({ type: "UPDATING_PROFILE" })
            expect(await getAction(store, "LOGIN_REQUIRED")).toEqual({ type: "LOGIN_REQUIRED" })
        })
    })
    describe('update email', () => {
        it('should send credentials and patch new email to API', async () => {
            mockApi.onPatch('/user').reply(200, { message: 'MOCK-SERVER-MSG' })
            store.dispatch(updateEmail({ new_email: 'new@mail.com', password: user.password }))
            expect(await getAction(store, "UPDATING_EMAIL")).toEqual({ type: "UPDATING_EMAIL" })
            expect(await getAction(store, "EMAIL_UPDATED")).toEqual({ type: "EMAIL_UPDATED", new_email: 'new@mail.com' })
        })
        it('should deny operation if API fails to process', async () => {
            mockApi.onPatch('/user').reply(400, { message: 'MOCK-SERVER-MSG' })
            store.dispatch(updateEmail({ new_email: 'new@mail.com', password: user.password }))
            expect(await getAction(store, "UPDATING_EMAIL")).toEqual({ type: "UPDATING_EMAIL" })
            expect(await getAction(store, "UPDATE_EMAIL_FAILED")).toEqual({ type: "UPDATE_EMAIL_FAILED" })
        })
    })
    describe('deactivate account', () => {
        it('should process operation with API, logout and reset the applicaiton', async () => {
            mockApi.onDelete('/user').reply(200)
            store.dispatch(deactivateAccount({ password: user.password }))
            expect(await getAction(store, "DEACTIVATING_USER")).toEqual({ type: "DEACTIVATING_USER" })
            expect(await getAction(store, "USER_DEACTIVATED")).toEqual({ type: "USER_DEACTIVATED" })
            expect(await getAction(store, "LOGOUT")).toEqual({ type: "LOGOUT" })
            expect(await getAction(store, "RESET_APP")).toEqual({ type: "RESET_APP" })
        })
        it('should deny operation if API fails to process', async () => {
            mockApi.onDelete('/user').reply(400)
            store.dispatch(deactivateAccount({ password: user.password }))
            expect(await getAction(store, "DEACTIVATING_USER")).toEqual({ type: "DEACTIVATING_USER" })
            expect(await getAction(store, "USER_DEACTIVATION_FAILED")).toEqual({ type: "USER_DEACTIVATION_FAILED" })
        })
    })
})