import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from 'api'
import EmailForm from '../components/EmailForm'

class ResendConfirmation extends Component{
    state = { complete : false }
    sendRecoveryLink = event => {
        event.preventDefault()
        const data = new FormData(event.target)
        api.patch("/auth", { email : data.get("email") })
        .then((res) => {
            if(res.status === 200){
                toast.success("New confirmation email sent")
                this.setState({ complete: true })
            }
        })
        .catch((err) => {
            const { message } = err.response.data
            if(err.response.status === 401){              
                toast.warn("No user with that email")
            }
            if(err.response.status === 400){
                toast.error(message)
            }
        })
    }
    render(){
        if(this.state.complete) return <Redirect to="/"/> 
        return <EmailForm handleSubmit={this.sendRecoveryLink}/>
    }
}

export default ResendConfirmation