import React from 'react'
import Navigation from './components/Navigation'
import { default as ProfileCard } from './containers/CardContainer' 

const Profile = () => {
    return(
        <div className="profile">
            <Navigation/>
            <ProfileCard/>
        </div>
    )
}

export default Profile