import React from 'react'
import { shallow } from 'enzyme'
import RegisterView from 'app/Register'
import { RegisterForm } from 'app/Register/components/Form'

describe('register view', () => {
    describe('<Register/>', () => {
        it('should render', () => {
            const component = shallow(<RegisterView/>)
            expect(component).toMatchSnapshot()
        })
    })
    describe('<RegisterForm/>', () => {
        const props = { redirect: false, register: jest.fn() }
        const event = { preventDefault: jest.fn() }
        it('should send user registration on submit', () => {
            const component = shallow(<RegisterForm {...props}/>)
            component.find('form').simulate('submit', event)
            expect(props.register).toHaveBeenCalledTimes(1)
        })
    })
})