import React from 'react'
import PropTypes from 'prop-types'

const UpdateAccount = ({ email, handleSubmit }) => {
    return(
        <form onSubmit={handleSubmit}>
            <header>
                <h3>Account</h3>
                <p>Update your account information</p>
            </header>
            <label htmlFor="new_email">New Email</label>
            <input id="new_email" name="new_email" placeholder={email}/>

            <label htmlFor="new_password">New Password</label>
            <input id="new_password" name="new_password" type="password"/>

            <label htmlFor="confirm">Confirm New Password</label>
            <input id="confirm" name="confirm" type="password"/>

            <fieldset>
                <legend>Manage Account Status</legend>
                <label htmlFor="deactivate">Deactivate Account</label>
                <input name="status" type="radio" id="deactivate" value="deactivate" title="Locks account from future usage until new login"/>

                <label htmlFor="delete">Delete Account</label>
                <input name="status" type="radio" id="delete" value="delete" title="Removes all account data"/>

                <label htmlFor="default">No Changes</label>
                <input name="status" type="radio" id="default" value="default" title="Make no changes to account status" checked/>
            </fieldset>
            <label htmlFor="password"><strong>Current Password</strong></label>
            <input id="password" name="password" type="password" placeholder="Required" required/>

            <input type="submit" className="btn" value="Update"/>
        </form>
    )
}

UpdateAccount.propTypes = {
    email: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default UpdateAccount