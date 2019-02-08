import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Card = ({ email, profile }) => {
    const avatar = profile.avatar || process.env.REACT_APP_DEFAULT_AVATAR 
    return(
        <article className="flex card box v-center">
            <div className="avatar">
                <figure className="animated rotateIn delay-2">
                    <img src={avatar} alt="avatar"/>
                </figure>
            </div>
            <div className="flex container animated fadeIn delay-3">
                <span className="fluid">
                    <h1>{profile.name}</h1>
                    <h2>{email}</h2>
                </span>
                <div className="flex options">
                    <Link className="button" to="/profile/update">
                        Update Profile
                    </Link>
                </div>
            </div>
        </article>
    )
}

Card.propTypes = {
    email: PropTypes.string.isRequired,
    profile: PropTypes.shape({
        name: PropTypes.string
    }).isRequired
}

export default Card