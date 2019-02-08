import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const AuthMixinBase = ({ isLoggedIn, children }) => {
    return !isLoggedIn ? <Redirect exact to='/'/> : children
}

AuthMixinBase.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
}

const mapStateToProps = state => {
    return { ...state.auth }
}

const AuthMixin = connect(mapStateToProps)(AuthMixinBase)

const loginRequired = Component => props => {
    return(
        <AuthMixin>
            <Component {...props}/>
        </AuthMixin>
    )
}

export default AuthMixin
export { loginRequired }