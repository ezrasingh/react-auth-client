import React, { Component } from 'react'
import { flow } from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Actions
import { 
    updateProfile, 
    updateEmail, 
    deactivateAccount 
} from 'actions/user'
import {
    updatePassword, 
    deleteAccount
} from 'actions/auth'
// Components
import UpdateProfile from '../components/UpdateProfile'
import UpdateAccount from '../components/UpdateAccount'
// Utils
import { titleCase } from 'utils/text'
import { withUser } from 'utils/user'

class Settings extends Component{
    static propTypes = {
        user: PropTypes.shape({
            email: PropTypes.string.isRequired,
            profile: PropTypes.shape({
                name: PropTypes.string.isRequired
            }).isRequired,
        }),
        delete: PropTypes.func.isRequired,
        deactivate: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired
    }
    updateProfile = event => {
        event.preventDefault()
        const data = new FormData(event.target)
        this.props.update("profile")({
            name : titleCase(`${data.get('first_name')} ${data.get('last_name')}`)
        })
    }
    updateAccount = event => {
        event.preventDefault()
        const data = new FormData(event.target)
        // Handle account status changes first
        switch(data.get("status")){
            case "deactivate":
                this.props.deactivate(data.get("password"))
                return
            case "delete":
                this.props.delete(data.get("password"))
                return
            default:
                break
        }
        if(data.get("new_email")){
            this.props.update("email")( 
            { 
                password : data.get("password"),
                new_email : data.get("new_email") 
            })
        }
        if(data.get("new_password")){
            this.props.update("password")( 
            {
                password : data.get("password"), 
                new_password : data.get("new_password"),
                confirm: data.get("confirm")
            })
        }
    }
    render(){
        const { email, profile } = this.props.user
        return(
            <div className="container animated slideInUp">
                <UpdateProfile {...profile} handleSubmit={this.updateProfile}/>
                <UpdateAccount email={email} handleSubmit={this.updateAccount}/>
            </div>
        ) 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delete: (password) => dispatch(deleteAccount({ password })),
        deactivate: (password) => dispatch(deactivateAccount({ password })),
        update: (action) => (payload) => {
            switch(action){
                case "profile":
                    dispatch(updateProfile(payload))
                    break
                case "email":
                    dispatch(updateEmail(payload))
                    break
                case "password":
                    dispatch(updatePassword(payload))
                    break
                default:
                    dispatch({ type: null })
            }
        }
    }
}

export { Settings as SettingsView }
export default flow(
    connect(null, mapDispatchToProps),
    withUser
)(Settings)