import React, { Component } from 'react'
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
            <div className="animated slideInUp">
                <Avatar {...this.props.user}/>
                <hr/>
                <Content/>
            </div>
        )
    }
}

export { Home as HomeView }
export default withUser(Home)