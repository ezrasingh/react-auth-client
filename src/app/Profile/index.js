import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { withNav } from 'app/components/Navbar'
import Menu from './containers/Menu'
import Home from './containers/Home'
import Update from './containers/Update'
import Footer from 'app/components/Footer'

const View = ({ action }) => {
    switch(action){
        case 'update':
            return <Update/>
        case 'home':
            return <Home/>
        default:
            return <Redirect to="/profile/home"/>
    }
}

const Profile = ({ match }) => {
    return(
        <section id="profile" className="view">
            <Menu/>
            <div className="container">
                <View {...match.params}/>
            </div>
            <Footer/>
        </section>
    )
}

View.propTypes = { action: PropTypes.string }

Profile.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.object.isRequired
    }).isRequired
}

export default withNav(Profile)