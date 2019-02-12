import React from 'react'
import { shallow } from 'enzyme'
import UpdateView from 'app/Update'
import { UpdateForm } from 'app/Update/components/Form'

describe('update view', () => {
    describe('<Update/>', () => {
        it('should render', () => {
            const component = shallow(<UpdateView/>)
            expect(component).toMatchSnapshot()
        })
    })
    describe('<UpdateForm/>', () => {
        const props = { profile: { name: null }, update: jest.fn() }
        const event = { preventDefault: jest.fn() }
        it('should update profile on form submission', () => {
            const component = shallow(<UpdateForm {...props}/>)
            component.find('form').simulate('submit', event)
            expect(props.update).toHaveBeenCalledTimes(1)
        })

    })
})