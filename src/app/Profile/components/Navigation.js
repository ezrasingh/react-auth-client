import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return(
        <nav className="flex">
            <NavLink className="button" to='/logout'>
                Logout
            </NavLink>
        </nav>
    )
}

export default Navigation