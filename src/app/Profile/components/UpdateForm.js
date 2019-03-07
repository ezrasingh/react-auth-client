import React from 'react'
import PropTypes from 'prop-types'

const UpdateForm = ({ name, handleSubmit }) => {
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder={name || ''}/>

            <input type="submit" className="btn" value="Save"/>
        </form>
    )
}

UpdateForm.propTypes = {
    name: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired
}

export default UpdateForm