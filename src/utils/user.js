import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { profile } from 'actions/user'

class UserMixinBase extends Component{
    static propTypes = {
        user: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
        loadProfile: PropTypes.func.isRequired,
        children: PropTypes.element.isRequired
    }

    componentDidMount(){
        this.props.loadProfile()
    }

    render(){
        const { isLoggedIn, children, user } = this.props
        const wrappedChild = cloneElement(children, { user })
        return !isLoggedIn ? <Redirect exact to='/'/> : wrappedChild
    }
}

const mapStateToProps = state => {
    return { ...state.auth, user : state.user  }
}

const mapDispatchToProps = dispatch => {
    return { loadProfile: () => dispatch(profile()) }
}

const UserMixin = connect(mapStateToProps, mapDispatchToProps)(UserMixinBase)

const withUser = Component => props => {
    return(
        <UserMixin>
            <Component {...props}/>
        </UserMixin>
    )
}

export default UserMixin
export { withUser }