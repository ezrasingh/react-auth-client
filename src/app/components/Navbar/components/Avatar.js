import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Avatar = ({ profileImg, name }) => {
    return(
        <NavLink id="avatar" to="/profile">
            <figure className="is-64 is-round">
                <img
                    src={profileImg || process.env.REACT_APP_DEFAULT_AVATAR} 
                    alt={name}
                />
            </figure>
        </NavLink>
    )
}

Avatar.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired
}

export default Avatar