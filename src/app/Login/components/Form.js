import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from 'actions/auth'

class LoginForm extends Component{
    static propTypes = { 
        isLoggedIn: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired
    }
    state = { show: false }
    handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.target)
        this.props.login({ 
            email : data.get('email'),
            password : data.get('password')
        })
    }
    toggleVisibility = () => {
        this.setState({ show: !this.state.show })
    }
    render(){
        if(this.props.isLoggedIn){
            return <Redirect to='/profile'/>
        }
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required/>

                <label htmlFor="password">
                    Password
                    <i 
                        className={this.state.show ? "fas fa-eye" : "fas fa-eye-slash"}
                        onClick={this.toggleVisibility}
                    />
                </label>
                <input id="password" name="password" type={this.state.show ? "text" : "password"} required/>

                <br/>
                <input className="button button-outline" type="submit" value="Login"/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return { ...state.auth }
}

const mapDispatchToProps = dispatch => {
    return { login: credentials => dispatch(login(credentials)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)