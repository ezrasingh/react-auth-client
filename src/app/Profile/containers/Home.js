import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../components/Avatar'
import Content from '../components/Content'
import { withUser } from 'utils/user'

class Home extends Component{
    static propTypes = {
        user: PropTypes.object.isRequired
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

export { Home as HomeView }
export default withUser(Home)