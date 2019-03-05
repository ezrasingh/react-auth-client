import React from 'react'
import { Redirect } from 'react-router-dom'
import { shallow } from 'enzyme'
import Loader from 'app/components/Loader'
import { LogoutComponent } from 'app/Logout'

const logout = jest.fn()

describe('<Logout/>', () => {
    const Logout = props => <LogoutComponent logout={logout} {...props}/>
    if('should trigger logout action on load', () => {
        shallow(<Logout isLoggedIn/>)
        expect(logout).toHaveBeenCalledTimes(1)
    })
    it('should render loader while logging out', () => {
        const component = shallow(<Logout isLoggedIn/>)
        expect(component.dive().equals(<Loader/>)).toBe(true)
    })
    it('should redirect a user', () => {
        const component = shallow(<Logout isLoggedIn={false}/>)
        expect(component.dive().equals(<Redirect to="/" exact/>)).toBe(true)
    })
})