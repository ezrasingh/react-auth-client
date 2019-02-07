import React from 'react'
import Navbar from 'app/components/Navbar'
import { default as ProfileCard } from './containers/CardContainer' 

const Profile = () => {
    return(
        <div className="profile overlay">
            <Navbar/>
            <div id="card-container" className="flex v-center h-center">
                <ProfileCard/>
            </div>
        </div>
    )
}

export default Profile