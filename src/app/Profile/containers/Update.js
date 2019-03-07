import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { update } from 'actions/user'
import UpdateForm from '../components/UpdateForm'

class Update extends Component{
    state = { redirect: false }
    static propTypes = {
        name: PropTypes.string.isRequired,
        update: PropTypes.func.isRequired
    }
    handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.target)
        this.props.update({
            name : data.get('name')
        }, () => {
            this.setState({ redirect: true })
        })
    }
    render(){
        if(this.state.redirect){
            return <Redirect to="/profile/home"/>
        }
        return <UpdateForm name={this.props.name} handleSubmit={this.handleSubmit}/>
    }
}

const mapStateToProps = state => {
    return { name: state.user.profile.name }
}

const mapDispatchToProps = dispatch => {
    return { update : (profile, cb) => { 
            dispatch(update(profile))
            cb()
        }
    }
}

export { Update as UpdateView }
export default connect(mapStateToProps, mapDispatchToProps)(Update)