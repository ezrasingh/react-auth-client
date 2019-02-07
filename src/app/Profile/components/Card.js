import React from 'react'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'

const Card = ({ email, profile }) => {
    const avatar = profile.avatar || process.env.REACT_APP_DEFAULT_AVATAR 
    return(
        <article className="flex card box">
            <div className="avatar">
                <figure>
                    <img src={avatar} alt="avatar"/>
                </figure>
            </div>
            <div className="flex container">
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

export default Card