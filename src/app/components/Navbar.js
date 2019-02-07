import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

/** Ruute template for registering routes within NavBar  */
function Route(name, href, auth){
    this.name = name
    this.href = href
    this.auth = auth
}

class Navbar extends Component{
    static routes = [
        new Route('Logout', '/logout', true),
    ]
    /** Filter routes that require authentication */
    generateRoutes(){
        return Navbar.routes.filter((route) => {
            return route.auth ^ !this.props.isLoggedIn
        })
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

const ConnectedNavbar = connect(mapStateToProps)(Navbar)

export const withNavbar = Child => props => {
    return(
        <Fragment>
            <div id="fixed-nav">
                <Navbar/>
            </div>
            <Child {...props}/>
        </Fragment>
    )
}

export default ConnectedNavbar