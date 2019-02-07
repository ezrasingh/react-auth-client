import React, { Component } from 'react'
import Loader from 'utils/Loader'
import Card from '../components/Card'
import { connect } from 'react-redux'
import { profile } from 'actions/user'

class CardContainer extends Component{
    componentWillMount(){
        this.props.loadProfile()
    }
    /** Check if profile state has updated */
    shouldComponentUpdate(nextProps){
        return !!nextProps.email ^ this.props.email
    }
    render(){
        const { isLoading, email, profile } = this.props
        return isLoading ? <Loader/> : <Card {...{email, profile}}/>
    }
}

const mapStateToProps = state => {
    return { ...state.user, isLoading: !state.user.email }
}

const mapDispatchToProps = dispatch => {
    return { loadProfile: () => dispatch(profile()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)