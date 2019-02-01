import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { loginRequired } from 'utils/auth'
import Profile from './Profile'
import Update from './Update'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'
import 'styles/index.css'

const Views = () => {
    return(
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route exact path="/profile" component={loginRequired(Profile)}/>
            <Route path="/profile/update" component={loginRequired(Update)}/>
            <Route path="/logout" component={loginRequired(Logout)}/>
        </Switch>
    )
}

export default Views