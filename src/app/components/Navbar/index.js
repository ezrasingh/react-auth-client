import React, { Fragment } from 'react'
import { default as Navbar } from './containers/MenuContainer'

const withNav = Component => props => {
    return(
        <Fragment>
            <Navbar/>
            <div className="navbar-container">
                <Component {...props}/>
            </div>
        </Fragment>
    )
}

export default Navbar
export { withNav }