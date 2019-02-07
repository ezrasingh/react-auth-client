import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return(
        <nav>
            <div className="container">
                <Link className="button" to='/logout'/>
            </div>
        </nav>
    )
}

export default Navigation