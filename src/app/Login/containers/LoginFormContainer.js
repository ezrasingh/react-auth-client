import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from 'actions/auth'
import LoginForm from '../components/LoginForm'

class LoginFormContainer extends Component{
    static propTypes = { 
        redirect: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired
    }
    handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.target)
        this.props.login({ 
            email : data.get('email'),
            password : data.get('password')
        })
    }
    render(){
        if(this.props.redirect) return <Redirect to='/profile'/>
        return <LoginForm handleSubmit={this.handleSubmit}/>
    }
}

const mapStateToProps = state => {
    return { redirect: state.auth.isLoggedIn }
}

const mapDispatchToProps = dispatch => {
    return { login: credentials => dispatch(login(credentials)) }
}

export { LoginFormContainer }
export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer)