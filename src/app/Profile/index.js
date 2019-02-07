import React from 'react'
import Navigation from './components/Navigation'
import { default as ProfileCard } from './containers/CardContainer' 

const Profile = () => {
    return(
        <div className="profile overlay">
            <Navigation/>
            <div id="card-container" className="flex v-center h-center">
                <ProfileCard/>
            </div>
        </div>
    )
}

export default Profile