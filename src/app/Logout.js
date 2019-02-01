import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from 'actions/auth'

class Logout extends Component{
    componentWillMount(){
        this.props.logout() 
    }

    render(){
        const { isLoggedIn } = this.props
        return isLoggedIn ? <em>Logging out...</em> : <Redirect exact to="/"/>
    }
}

const mapStateToProps = state => {
    return { ...state.auth }
}

const mapDispatchToProps = dispatch => {
    return { logout : () => dispatch(logout()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)