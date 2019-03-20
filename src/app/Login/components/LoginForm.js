import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FadeInGroup from 'animations/FadeInGroup'

class LoginForm extends Component{
    state = { reveal: false }
    static propTypes = { 
        handleSubmit: PropTypes.func.isRequired
    }
    toggleVisibility = () => {
        this.setState({ reveal: !this.state.reveal })
    }
    render(){
        return(
            <form onSubmit={this.props.handleSubmit}>
                <FadeInGroup>
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
                        <Link className="link" to='/register'>Don't have an account?</Link>
                        <br/>
                        <Link className="link" to='/recover'>Forgot password?</Link>
                    </div>
                </FadeInGroup>
            </form>
        )
    }
}

export default LoginForm