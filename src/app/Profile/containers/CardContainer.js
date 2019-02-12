import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from 'utils/Loader'
import Card from '../components/Card'
import { connect } from 'react-redux'
import { profile } from 'actions/user'

class CardContainer extends Component{
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        email: PropTypes.string,
        profile: PropTypes.object,
        loadProfile: PropTypes.func.isRequired
    }
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

export { CardContainer }
export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)