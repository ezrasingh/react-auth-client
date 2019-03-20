import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FadeInGroup from 'animations/FadeInGroup'

const EmailForm = ({ handleSubmit }) => {
    return(
        <form onSubmit={handleSubmit}>
            <FadeInGroup>
                <header>
                    <h3>Account Confirmation</h3>
                    <p>Resend confirmation link via email</p>
                </header>
    
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required/>
    
                <input className="btn" type="submit" value="Send Confirmation Link"/>
                <div className="prompt">
                    <Link className="link" to="/register">Go back to registration</Link>
                </div>
            </FadeInGroup>
        </form>
    )
}

EmailForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default EmailForm