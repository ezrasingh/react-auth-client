import React from 'react'
import PropTypes from 'prop-types'
import { LazyInline } from 'utils/lazy'

const Avatar = ({ profile }) =>{
    return(
        <div id="avatar">
            <figure className="is-square is-128">
                <img src={profile.avatar || process.env.REACT_APP_DEFAULT_AVATAR} alt=""/>
                <figcaption>
                    {profile.name ? <span className="animated fadeIn">{profile.name}</span> : <LazyInline/>}
                </figcaption>
            </figure>
        </div>
    )
}

Avatar.propTypes = {
    profile: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string
    }).isRequired
}

export default Avatar