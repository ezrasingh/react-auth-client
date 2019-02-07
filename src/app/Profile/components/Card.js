import React from 'react'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'

const Card = ({ email, profile }) => {
    const avatar = profile.avatar || process.env.REACT_APP_DEFAULT_AVATAR 
    return(
        <article className="card">
            <div className="avatar">
                <figure>
                    <img src={avatar} alt="avatar"/>
                </figure>
            </div>
            <div className="details">
                <h1>{profile.name}</h1>
                <h2>{email}</h2>
                <div className="options">
                    <Link className="button button-outline" to="/profile/update">
                        Update Profile
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default Card