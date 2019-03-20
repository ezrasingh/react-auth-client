import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'

class Menu extends Component{
    state = { showMenu: false, trigger: false }
    toggleMenu(){

        this.setState({ showMenu: !this.state.showMenu }, () => {
            /** 
             * Delayed trigger to delay z-Index shifting on navbar parent
             * this makes the entrance and exit transitions much more smooth
             */
            setTimeout(
                () => this.setState({ trigger: this.state.showMenu }), 
                // NOTE: Trigger speed is longer on exit animations to prevent jumpiness
                this.state.showMenu ? 0 : 1000
            )
        })
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
        const toggleIcon = cx("fa", showMenu ? "fa-window-close" : "fa-bars")
        const menuClass = cx("menu animated", showMenu ? "slideInLeft" : "slideOutRight")
        return(
            <div id="mobile" className="container">
                <i 
                    onClick={this.toggleMenu.bind(this)}
                    className={toggleIcon}
                />
                <div className={menuClass}>
                    {this.generateRoutes()}
                </div>
            </div>
        )
    }
    render(){
        /** Toggles z-index to slide behind content when showMenu is false and overlay menu is active **/
        const smartHideStyle = { zIndex: this.state.trigger ? 100 : 0 } 
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