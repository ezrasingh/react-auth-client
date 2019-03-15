import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from 'api'
import Loader from 'app/components/Loader'

class CompleteConfirmation extends Component{
    state = { isLoading: true, complete: false }
    static propTypes = {
        token: PropTypes.string.isRequired
    }

    componentDidMount(){
        api.post("/validate/confirmation", this.props)
        .then((res) => {
            if(res.status === 200){
                toast.success('Registration complete')
                this.setState({ isLoading: false, complete: true })
            }
        })
        .catch((err) => {
            if(err.status === 400){
                this.setState({ isLoading: false, complete: false })
            }
        })
    }

    render(){
        const { isLoading, complete } = this.state
        if(isLoading) return <Loader/>
        if(!isLoading && complete) return <Redirect to="/"/>
        return(
            <section className="container">
                <h3>Invalid Token</h3>
                <p>The confirmation token provided is either <i>invalid</i> or <i>expired</i></p>
            </section>
        )
    }
}

export default CompleteConfirmation