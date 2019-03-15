import React from 'react'
import { Redirect } from 'react-router-dom'
import  Login from 'app/Login'
import { LoginFormContainer } from 'app/Login/containers/LoginFormContainer'
import LoginForm from 'app/Login/components/LoginForm'
import { shallow } from 'enzyme'

describe('login view', () => {
    describe('<Login />', () => {
        it('should render', () => {
            const component = shallow(<Login/>)
            expect(component).toMatchSnapshot()
        })
    })
    describe('<LoginFormContainer />', () => {
        const props = { redirect: false, login: jest.fn() }
        const event = { preventDefault: jest.fn() }
        beforeEach(() => {
            props.redirect = false
        })
        it('should redirect if user is authenticated', () => {
            props.redirect = true
            const component = shallow(<LoginFormContainer {...props}/>)
            expect(component.equals(<Redirect to="/profile"/>)).toBe(true)
        })
        it('should should handle login on form submission', () => {
            const component = shallow(<LoginFormContainer {...props}/>)
            component.dive().find('form').simulate('submit', event)
            expect(event.preventDefault).toHaveBeenCalledTimes(1)
            expect(props.login).toHaveBeenCalledTimes(1)
        })
    })
    describe('<LoginForm />', () => {
        const props = { handleSubmit: jest.fn() }
        it('should handle form submission', () => {
            const component = shallow(<LoginForm {...props}/>)
            component.find('form').simulate('submit')
            expect(props.handleSubmit).toHaveBeenCalledTimes(1)
        })
        it('should toggle password form visibility', () => {
            const component = shallow(<LoginForm {...props} />)
            const input = () => component.find('#password')
            const toggle = component.find('div.hide-show span') 
            expect(input().props().type).toBe('password')
            toggle.simulate('click')
            expect(input().props().type).toBe('text')
            toggle.simulate('click')
            expect(input().props().type).toBe('password')
        })
    })
})