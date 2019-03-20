import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FadeInGroup from 'animations/FadeInGroup'

const EmailForm = ({ handleSubmit }) => {
    return(
        <form className="animated fadeIn" onSubmit={handleSubmit}>
            <FadeInGroup>
                <header>
                    <h3>Forgot Your Password?</h3>
                    <p>Recover your account via email</p>
                </header>
                
                <label htmlFor="email">Email</label>
                <input name="email" id="email" type="email" required/>
    
                <input className="btn" type="submit" value="Send Recovery Link"/>
                <div className="prompt">
                    <Link className="link" to="/">Go Back to login</Link>
                </div>
            </FadeInGroup>
        </form>
    )
}

EmailForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default EmailForm