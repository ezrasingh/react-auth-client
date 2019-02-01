import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from 'actions/user'

class RegisterForm extends Component{
    state = { redirect: false }
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
        if(this.state.redirect){
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

const mapDispatchToProps = dispatch => {
    return { register : credentials => dispatch(register(credentials)) }
}

export default connect(null, mapDispatchToProps)(RegisterForm)