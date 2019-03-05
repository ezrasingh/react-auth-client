import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { loginRequired } from 'utils/auth'
import Profile from './Profile'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'

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

export default Views