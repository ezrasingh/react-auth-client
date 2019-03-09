import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Provider } from 'react-redux'
import { loginRequired } from 'utils/auth'
import Profile from './Profile'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'
import store from 'store'

const Views = () => {
    window.scrollTo(0,0)
    return(
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/profile/:action?" component={loginRequired(Profile)}/>
            <Route path="/logout" component={loginRequired(Logout)}/>
        </Switch>
    )
}

const App = () => {
    toast("Simple Auth Client", { autoClose: 7800 })
    toast.info("By Ezra Singh", { autoClose: 8000 })
    return(
        <BrowserRouter>
            <Provider store={store}>
                <ToastContainer/>
                <Views/>
            </Provider>
        </BrowserRouter>
    )
}

export default App