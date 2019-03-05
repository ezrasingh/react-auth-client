import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { profile } from 'actions/user'
import Avatar from '../components/Avatar'
import Content from '../components/Content'

class Home extends Component{
    static propTypes = {
        user: PropTypes.object.isRequired,
        loadProfile: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.loadProfile()
    }

    render(){
        return(
            <Fragment>
                <Avatar {...this.props.user}/>
                <hr/>
                <Content/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => {
    return { loadProfile: () => dispatch(profile()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)