import React from 'react'
import { Link } from 'react-router-dom'
import Form from './components/Form'

/** Login portal */
const Login = () => {
    return(
        <div>
            <h2>Login</h2>
            <Form/>
            <Link to='/register'>
                Create an account
            </Link>
        </div>
    )
}

export default Login