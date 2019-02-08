import React from 'react'
import Form from './components/Form'
import withNavbar from 'utils/withNavbar'

const Update = () => {
    return(
        <div className="flex update-profile overlay v-center h-center">
            <div className="flex box animated fadeInUp">
                <h2>Update Profile</h2>
                <Form/>
            </div>
        </div>
    )
}

export default withNavbar(Update)