import React from 'react'
import { Link } from 'react-router-dom'
import Form from './components/Form'

const Update = () => {
    return(
        <div>
            <Form/>
            <br/>
            <Link to="/profile">View Profile</Link>
        </div>
    )
}

export default Update