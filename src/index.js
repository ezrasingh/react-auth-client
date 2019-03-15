import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app'
import ga from 'react-ga'
import * as serviceWorker from 'serviceWorker'
import 'styles/core.scss'

const root = document.getElementById('app-root')

ReactDOM.render(<App/>, root)

if(process.env.NODE_ENV === 'production'){
    serviceWorker.register()
    ga.initialize(process.env.REACT_APP_GTAG_ID)
}
else{
    serviceWorker.unregister()
    ga.initialize(process.env.REACT_APP_GTAG_ID, { testMode: true })
}