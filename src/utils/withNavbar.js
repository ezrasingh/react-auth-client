import React, { Fragment } from 'react'
import Navbar from 'app/components/Navbar'

const withNavbar = Component => props => {
    return(
        <Fragment>
            <Navbar/>
            <Component {...props}/>
        </Fragment>
    )
}

export default withNavbar