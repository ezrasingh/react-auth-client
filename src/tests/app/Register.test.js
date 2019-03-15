import React from 'react'
import { shallow } from 'enzyme'
import Register from 'app/Register'
import { RegistrationFormContainer } from 'app/Register/containers/RegistrationFormContainer'
import RegistrationForm from 'app/Register/components/RegistrationForm'

describe('register view', () => {
    describe('<Register/>', () => {
        it('should render', () => {
            const component = shallow(<Register/>)
            expect(component).toMatchSnapshot()
        })
    })
    describe('<RegistrationFormContainer />', () => {
        const props = { redirect: false, register: jest.fn() }
        const event = { preventDefault: jest.fn() }
        it('should send user registration on form submission', () => {
            const component = shallow(<RegistrationFormContainer {...props}/>)
            component.dive().find('form').simulate('submit', event)
            expect(event.preventDefault).toHaveBeenCalledTimes(1)
            expect(props.register).toHaveBeenCalledTimes(1)
        })
    })
    describe('<RegistrationForm />', () => {
        const props = { handleSubmit: jest.fn() }
        it('should handle form submission', () => {
            const component = shallow(<RegistrationForm {...props}/>)
            component.find('form').simulate('submit')
            expect(props.handleSubmit).toHaveBeenCalledTimes(1)
        })
    })
})