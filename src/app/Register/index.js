import React from 'react'
import { Link } from 'react-router-dom'
import Form from './components/Form'

const Register = () => {
    return(
        <div className="register overlay flex h-center v-center">
            <div className="form box">
                <h2>Register</h2>
                    <Form/>
                <Link to="/">
                    Already have an account?
                </Link>
            </div>
        </div>
    )
}

export default Register