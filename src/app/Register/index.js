import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Form from './components/Form'

const Register = () => {
    return(
        <Fragment>
            <h2>Register</h2>
            <div>
                <Form/>
            </div>
            <Link to="/">
                Already have an account?
            </Link>
        </Fragment>
    )
}

export default Register