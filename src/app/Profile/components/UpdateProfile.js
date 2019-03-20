import React from 'react'
import PropTypes from 'prop-types'

const UpdateProfile = ({ name, handleSubmit }) => {
    const [ firstName, lastName ] = name.split(' ')
    return(
        <form onSubmit={handleSubmit}>
            <header>
                <h3>Profile</h3>
                <p>Update your profile information</p>
            </header>
            <label>Name</label>
            <div className="is-flex">
                <input id="first_name" name="first_name" defaultValue={firstName} placeholder='First'/>
                <input id="last_name" name="last_name" defaultValue={lastName} placeholder='Last'/>
            </div>   

            <input type="submit" className="btn" value="Update"/>
        </form>
    )
}

UpdateProfile.propTypes = {
    name: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired
}

export default UpdateProfile