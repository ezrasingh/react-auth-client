import React from 'react'
import { Redirect } from 'react-router-dom'
import LoginView from 'app/Login'
import { LoginForm } from 'app/Login/components/Form'
import { shallow } from 'enzyme'

describe('login view', () => {
    describe('<Login />', () => {
        it('should render', () => {
            const component = shallow(<LoginView/>)
            expect(component).toMatchSnapshot()
        })
    })
    describe('<LoginForm />', () => {
        const props = { isLoggedIn: false, login: jest.fn() }
        const event = { preventDefault: jest.fn() }
        beforeEach(() => {
            props.isLoggedIn = false
        })
        it('should redirect if user is authenticated', () => {
            props.isLoggedIn = true
            const component = shallow(<LoginForm {...props}/>)
            expect(component.equals(<Redirect to="/profile"/>)).toBe(true)
        })
        it('should submit login request on submit', () => {
            const component = shallow(<LoginForm {...props}/>)
            component.find('form').simulate('submit', event)
            expect(props.login).toHaveBeenCalledTimes(1)
        })
        it('should toggle password form visibility', () => {
            const component = shallow(<LoginForm {...props} />)
            const input = () => component.find('#password')
            const toggle = component.find('i.fas') 
            expect(input().props().type).toBe('password')
            toggle.simulate('click')
            expect(input().props().type).toBe('text')
            toggle.simulate('click')
            expect(input().props().type).toBe('password')
        })
    })
})