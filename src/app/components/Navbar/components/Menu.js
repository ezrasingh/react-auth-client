import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'

class Menu extends Component{
    state = { showMenu: false }
    toggleMenu(){
        this.setState({ showMenu: !this.state.showMenu })
    }
    generateRoutes(){
        return this.props.routes.map((route) => (
            <NavLink className="link" to={route.href} key={route.href}>
                {route.name}
            </NavLink>
        ))
    }
    renderMenu(){
        return(
            <div className="container">
                {this.generateRoutes()}
                {this.props.isLoggedIn && <Avatar {...this.props.profile}/>}
            </div>
        )
    }
    renderMobileMenu(){
        const { showMenu } = this.state
        const toggleIcon = cx("fa", { "fa-window-close" : showMenu, "fa-bars" : !showMenu })
        return(
            <div id="mobile" className="container">
                <i 
                    onClick={this.toggleMenu.bind(this)}
                    className={toggleIcon}
                />
                <div className="menu">
                    {showMenu && this.generateRoutes()}
                </div>
            </div>
        )
    }
    render(){
        /** Toggles z-index to slide behind content when showMenu is false and overlay menu is active **/
        const smartHideStyle = { zIndex: this.state.showMenu ? 100 : 0 } 
        return(
            <nav style={smartHideStyle} className="navbar">
                {this.renderMenu()}
                {this.renderMobileMenu()}
            </nav>
        )
    }
}

Menu.propTypes = {
    profile: PropTypes.object.isRequired,
    routes: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired
    })).isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}

export default Menu