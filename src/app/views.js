import React from 'react'
import ga from 'react-ga'
import PropTypes from 'prop-types'
import { Switch, Route, withRouter } from 'react-router-dom'
import { loginRequired } from 'utils/auth'
import Profile from './Profile'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'
import ConfirmAccount from './ConfirmAccount'
import ConfirmRecovery from './RecoverAccount'
import ErrorPage from './ErrorPage'
import PageTransition from 'animations/PageTransition'

const Views = ({ location }) => {
    ga.pageview(location.pathname)
    return(
        <PageTransition location={location} onLoad={() => window.scrollTo(0,0)}>
            <Switch location={location}>
                <Route exact path="/" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile/:action?" component={loginRequired(Profile)}/>
                <Route path="/confirm/:token?" component={ConfirmAccount}/>
                <Route path="/recover/:token?" component={ConfirmRecovery}/>
                <Route path="/logout" component={loginRequired(Logout)}/>
                <Route component={ErrorPage}/>
            </Switch>
        </PageTransition>
    )
}

Views.propTypes = {
    location: PropTypes.object.isRequired
}

export default withRouter(Views)