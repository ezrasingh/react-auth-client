import React, { Component } from 'react'
import Tabs from '../components/Tabs'

class Menu extends Component{
    static items = [ 
        { name: 'Home', href: '/profile/home' },
        { name: 'Edit', href: '/profile/update' }
    ]

    render(){
        return(
            <nav className="menu is-sticky">
                <Tabs items={Menu.items}/>
            </nav>
        )
    }
}

export default Menu