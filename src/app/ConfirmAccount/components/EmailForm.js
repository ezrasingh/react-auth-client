import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const EmailForm = ({ handleSubmit }) => {
    return(
        <form onSubmit={handleSubmit}>
            <header>
                <h3>Account Recovery</h3>
                <p>Resend recovery link via email</p>
            </header>

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required/>

            <input className="btn" type="submit" value="Send Recovery Link"/>
            <div className="prompt">
                <Link className="link" to="/register">Go back to registration</Link>
            </div>
        </form>
    )
}

EmailForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default EmailForm