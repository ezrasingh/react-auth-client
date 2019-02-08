import React from 'react'
import { Link } from 'react-router-dom'
import Form from './components/Form'

/** Login portal */
const Login = () => {
    return(
        <div className="login overlay flex h-center v-center">
            <div className="form box animated fadeInUp">
                <h2>Login</h2>
                <Form/>
                <Link to='/register'>
                    Create an account
                </Link>
            </div>
        </div>
    )
}

export default Login