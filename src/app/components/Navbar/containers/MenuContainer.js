import React, { Component } from 'react'
import { connect } from 'react-redux'
import Menu from '../components/Menu'

/**
 * Route template for registering routes within Navbar
 * @param {} name - Nav item title 
 * @param {} href - Nav link
 * @param {} auth - display only for logged in users
 * @param {} hideOnAuth - display only for anonymous users
 */
function Route(name, href, auth, hideOnAuth){
    this.name = name
    this.href = href
    this.auth = auth
    this.hideOnAuth = hideOnAuth
}

class MenuContainer extends Component{
    static routes = [
        new Route('Profile', '/profile', { auth: true }),
        new Route('Logout', '/logout', { auth: true })
    ]
    /** Filter routes that require authentication */
    generateRoutes(){
        if(!this.props.isLoggedIn){
            // Filter routes that do not require auth
            return MenuContainer.routes.filter((route) => !route.auth)
        }
        else{
            // Filter routes that require auth and are not flagged to hide on auth
            return MenuContainer.routes.filter((route) => route.auth && !route.hideOnAuth)
        }
    }
    render(){
        return <Menu routes={this.generateRoutes()} {...this.props}/>
    }
}

const mapStateToProps = state => {
    return { 
        ...state.auth, 
        profile: {
            avatar: state.user.profile.avatar,
            name: state.user.profile.name
        }
    }
}

export { MenuContainer }
export default connect(mapStateToProps)(MenuContainer)