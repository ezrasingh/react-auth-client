import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from 'api'
import EmailForm from '../components/EmailForm'

class SendRecovery extends Component{
    state = { complete : false }

    sendRecoveryLink = event => {
        event.preventDefault()
        const data = new FormData(event.target)
        api.patch("/auth", { email: data.get("email") })
        .then((res) => {
            if(res.status === 200){
                this.setState({ complete: true })
            }
        })
        .catch((err) => {
            const { message } = err.response.data
            if(err.response.status === 401){
                toast.warn("A user with that email does not exist")
            }
            if(err.response.status === 400){
                toast.error(message)
            }
        })
    }

    render(){
        if(!this.state.complete) return <EmailForm handleSubmit={this.sendRecoveryLink}/>
        return (
            <section className="content">
                <h1>Recovery Link</h1>
                <p>Account recovery link was sent to your email</p>
                <Link className="link" to="/">Back To Login</Link>
            </section>
        )
    }
}


export default SendRecovery