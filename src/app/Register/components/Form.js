import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from 'actions/user'

class RegisterForm extends Component{
    handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        this.props.register({
            email : data.get('email'),
            password : data.get('password'),
            confirm : data.get('confirm')
        })
    }
    render(){
        if(this.props.redirect){
            return <Redirect exact push to='/'/>
        }
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input name="email" id="email" type="email" required/>

                <label htmlFor="password">Password:</label>
                <input name="password" id="password" type="password" required/>
                
                <label htmlFor="confirm">Confirm Password:</label>
                <input name="confirm" id="confirm" type="password" required/>

                <input type="submit" value="Create Account"/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    // NOTE: user.email when null indicates user has not been created
    return { redirect : state.user.email === false }
}

const mapDispatchToProps = dispatch => {
    return { register : (credentials) => dispatch(register(credentials)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)