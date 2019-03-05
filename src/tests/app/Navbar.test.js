import React from 'react'
import { NavbarComponent } from 'app/components/Navbar'
import { shallow } from 'enzyme'

describe('<Navbar/>', () => {
    it('should render components w/o auth', () => {
        const props = { isLoggedIn: false, avatar: '', name: '' }
        const component = shallow(<NavbarComponent {...props}/>)
        expect(component).toMatchSnapshot()
    })
    it('should render components w/ auth', () => {
        const props = { isLoggedIn: true, avatar: '', name: '' }
        const component = shallow(<NavbarComponent {...props}/>)
        expect(component).toMatchSnapshot()
    })
})