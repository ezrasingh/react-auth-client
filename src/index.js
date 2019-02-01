import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Views from 'app'
import store from 'store'
import * as serviceWorker from 'serviceWorker'
import 'styles/core.scss'

const App = (
    <BrowserRouter>
        <Provider store={store}>
            <Views/>
        </Provider>
    </BrowserRouter>
)

ReactDOM.render(App, document.getElementById('root'))

if(process.env.NODE_ENV === 'production'){
    serviceWorker.register()
}
else{
    serviceWorker.unregister()
}

