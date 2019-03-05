import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from 'actions/auth'
import Loader from 'app/components/Loader'

class Logout extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired
    }
    componentWillMount(){
        this.props.logout()
    }

    shouldComponentUpdate(nextProps){
        return nextProps.isLoggedIn !== this.props.isLoggedIn
    }

    render(){
        const { isLoggedIn } = this.props
        return isLoggedIn ? <Loader/> : <Redirect exact to="/"/>
    }
}

const mapStateToProps = state => {
    return { ...state.auth }
}

const mapDispatchToProps = dispatch => {
    return { logout : () => dispatch(logout()) }
}

export { Logout as LogoutComponent }
export default connect(mapStateToProps, mapDispatchToProps)(Logout)