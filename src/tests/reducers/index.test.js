import rootReducer, { defaultState } from 'reducers'

describe('root reducer', () => {
    it('should be able to reset combined app state', () => {
        const state = rootReducer({}, "RESET_APP")
        expect(state).toEqual(defaultState)
    })
})