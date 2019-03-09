import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'
import * as serviceWorker from 'serviceWorker'
import 'styles/core.scss'

const root = document.getElementById('app-root')

ReactDOM.render(<App/>, root)

if(process.env.NODE_ENV === 'production'){
    serviceWorker.register()
}
else{
    serviceWorker.unregister()
}