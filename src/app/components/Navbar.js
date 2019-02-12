import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        avatar: PropTypes.string,
        name: PropTypes.string
    }
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
            <figure className="avatar animated rotateIn delay-2">
                <NavLink to="/profile">
                    <img 
                        src={this.props.avatar || process.env.REACT_APP_DEFAULT_AVATAR} 
                        alt={this.props.name}
                    />
                </NavLink>
            </figure>
        )
    }
    render(){
        return(
            <nav className="flex navbar animated slideInDown">
                {this.generateRoutes().map((route) => (
                    <NavLink className="button button-outline" to={route.href} key={route.href}>
                        {route.name}
                    </NavLink>
                ))}
                {this.props.isLoggedIn && this.renderAvatar()}
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return { ...state.auth, avatar: state.user.profile.avatar, name: state.user.profile.name }
}

export { Navbar as NavbarComponent }
export default connect(mapStateToProps)(Navbar)