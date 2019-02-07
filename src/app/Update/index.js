import React from 'react'
import Form from './components/Form'
import withNavbar from 'utils/withNavbar'

const Update = () => {
    return(
        <div className="flex update-profile overlay v-center h-center">
            <div className="flex box">
                <Form/>
            </div>
        </div>
    )
}

export default withNavbar(Update)