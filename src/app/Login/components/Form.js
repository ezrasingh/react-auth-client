import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from 'actions/auth'

class LoginForm extends Component{
    state = { reveal: false }
    handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.target)
        this.props.login({ 
            email : data.get('email'),
            password : data.get('password')
        })
    }
    toggleVisibility = () => {
        this.setState({ reveal: !this.state.reveal })
    }
    render(){
        if(this.props.isLoggedIn){
            return <Redirect to='/profile'/>
        }
        return(
            <form onSubmit={this.handleSubmit}>
                <header>
                    <h3>Login</h3>
                    <p>Authenticate identity</p>
                </header>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required/>

                <label htmlFor="password">Password</label>
                <input id="password" name="password" type={this.state.reveal ? "text" : "password"} required/>
                <div className="hide-show">
                    <span onClick={this.toggleVisibility}>
                        {this.state.reveal ? 'Hide' : 'Show'}
                    </span>
                </div>
                <input className="btn" type="submit" value="Login"/>
                <div className="prompt">
                    <Link to='/register'>Don't have an account?</Link>
                </div>
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

export { LoginForm }
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)