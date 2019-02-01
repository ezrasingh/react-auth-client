import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer, { defaultState } from 'reducers'

const middleware = applyMiddleware(thunk, logger)

export default createStore(
    rootReducer, 
    defaultState,
    process.env.NODE_ENV === 'production' ? middleware : composeWithDevTools(middleware),
)