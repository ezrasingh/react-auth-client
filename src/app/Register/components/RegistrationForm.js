import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const RegistrationForm = ({ handleSubmit }) => {
    return(
        <form onSubmit={handleSubmit}>
            <header>
                <h3>Register</h3>
                <p>Create a new user</p>
            </header>
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="email" required/>

            <label>Name</label>
            <div className="is-flex">
                <input name="first_name" placeholder="First" required/>
                <input name="last_name" placeholder="Last" required/>
            </div>

            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" required/>
            
            <label htmlFor="confirm">Confirm Password</label>
            <input name="confirm" id="confirm" type="password" required/>

            <input type="submit" className="btn" value="Create Account"/>

            <div className="prompt">
                <Link className="link" to='/'>Already have an account?</Link>
                <br/>
                <Link className="link" to="/confirm">Need to resend confirmation link?</Link>
            </div>
        </form>
    )
}

RegistrationForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default RegistrationForm