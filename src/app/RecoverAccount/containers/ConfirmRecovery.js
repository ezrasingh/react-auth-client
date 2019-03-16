import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import ResetPasswordForm from '../components/ResetPasswordForm'
import api from 'api'

class ConfirmRecovery extends Component{
    state = { confirmed: null }
    static propTypes = {
        token: PropTypes.string.isRequired
    }

    resetAccount = event => {
        event.preventDefault()
        const data = new FormData(event.target)
        const payload = {
            ...this.props,
            "new_password" : data.get("new_password"),
            "confirm" : data.get("confirm")
        }
        api.post("/validate/recovery", payload)
        .then((res) => {
            const { message } = res.data
            if(res.status === 200){
                toast.success(message || "Password was reset")
                this.setState({ confirmed: true })
            }
        })
        .catch((err) => {
            if(err.response.status === 401){
                toast.danger("Passwords do not match")
            }
            if(err.response.status === 400){
                toast.error("Invalid recovery token")
                this.setState({ confirmed: false })
            }
        })
    }

    render(){
        switch(this.state.confirmed){
            case true:
                return <Redirect to="/"/>
            case false:
                return <Redirect to="/recover"/>
            case null:
            default:
                return <ResetPasswordForm handleSubmit={this.resetAccount}/>
        }
    }
}

export default ConfirmRecovery