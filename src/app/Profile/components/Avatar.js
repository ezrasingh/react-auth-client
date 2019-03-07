import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({ profile }) =>{
    return(
        <div id="avatar">
            <figure className="is-square is-128">
                <img src={profile.avatar || process.env.REACT_APP_DEFAULT_AVATAR} alt=""/>
                <figcaption>{profile.name}</figcaption>
            </figure>
        </div>
    )
}

Avatar.propTypes = {
    profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string
    }).isRequired
}

export default Avatar