import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { update } from 'actions/user'

class UpdateProfile extends Component{
    static propTypes = {
        profile: PropTypes.shape({
            name: PropTypes.string
        }).isRequired
    }
    state = { redirect: false }
    handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.target)
        this.props.update({
            name : data.get('name')
        })
    }
    render(){
        const { profile } = this.props
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" placeholder={!isEmpty(profile) && "name" in profile && profile.name}/>

                <input type="submit" value="Save"/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return { profile: state.user.profile }
}

const mapDispatchToProps = dispatch => {
    return { update : profile => dispatch(update(profile)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)