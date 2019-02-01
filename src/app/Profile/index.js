import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { profile } from 'actions/user'

class Profile extends Component{
    componentWillMount(){
        this.props.load()
    }
    renderProfile(){
        const { profile } = this.props
        if(isEmpty(profile)){
            return <span>Please create a profile.</span>
        }
        else{
            return(
                <Fragment>
                    <strong>Name</strong> : { 'name' in profile && profile.name }
                    <br/>
                </Fragment>
            )
        }
    }
    render(){
        const { email } = this.props
        if(!email){
            return <em>Loading....</em>
        }
        return(
            <div>
                <strong>Email</strong> : { email }
                <br/>
                <h2>Profile</h2>
                {this.renderProfile()}
                <Link to="/profile/update">Update Profile</Link>
                <Link to="/logout">Logout</Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ...state.user }
}

const mapDispatchToProps = dispatch => {
    return { load: () => dispatch(profile()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)