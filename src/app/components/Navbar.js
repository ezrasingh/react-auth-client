import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

/** Ruute template for registering routes within NavBar  */
function Route(name, href, auth, hideOnAuth){
    this.name = name
    this.href = href
    this.auth = auth
    this.hideOnAuth = hideOnAuth
}

class Navbar extends Component{
    static routes = [
        new Route('Logout', '/logout', true)
    ]
    /** Filter routes that require authentication */
    generateRoutes(){
        if(!this.props.isLoggedIn){
            // Filter routes that do not require auth
            return Navbar.routes.filter((route) => !route.auth)
        }
        else{
            // Filter routes that require auth and are not flagged to hide on auth
            return Navbar.routes.filter((route) => route.auth && !route.hideOnAuth)
        }
    }
    renderAvatar = () =>{
        return(
            <figure className="avatar">
                <NavLink to="/profile">
                    <img src={this.props.avatar || process.env.REACT_APP_DEFAULT_AVATAR}/>
                </NavLink>
            </figure>
        )
    }
    render(){
        return(
            <nav className="flex navbar">
                {this.generateRoutes().map((route) => (
                    <NavLink className="button" to={route.href} key={route.href}>
                        {route.name}
                    </NavLink>
                ))}
                {this.props.isLoggedIn && this.renderAvatar()}
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return { ...state.auth, avatar: state.user.profile.avatar }
}

export default connect(mapStateToProps)(Navbar)