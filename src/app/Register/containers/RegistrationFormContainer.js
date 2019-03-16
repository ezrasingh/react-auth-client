import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from 'actions/user'
import { titleCase } from 'utils/text'
import RegistrationForm from '../components/RegistrationForm'

class RegistrationFormContainer extends Component{
    static propTypes = {
        redirect: PropTypes.bool.isRequired,
        register: PropTypes.func.isRequired
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        const name = data.get('first_name') + ' ' + data.get('last_name')
        this.props.register({
            email : data.get('email'),
            name: titleCase(name),
            password : data.get('password'),
            confirm : data.get('confirm')
        })
    }
    render(){
        if(this.props.redirect) return <Redirect exact to='/'/>
        return <RegistrationForm handleSubmit={this.handleSubmit}/>
    }
}

const mapStateToProps = state => {
    // NOTE: user.email when null indicates user has not been created
    return { redirect : state.user.email === false }
}

const mapDispatchToProps = dispatch => {
    return { register : (credentials) => dispatch(register(credentials)) }
}

export { RegistrationFormContainer, titleCase }
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationFormContainer)