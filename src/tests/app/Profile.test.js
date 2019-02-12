import React from 'react'
import { shallow } from 'enzyme'
import Loader from 'utils/Loader'
import Profile from 'app/Profile'
import { CardContainer } from 'app/Profile/containers/CardContainer'
import Card from 'app/Profile/components/Card'

describe('profile view', () => {
    describe('<Profile/>', () => {
        it('should render', () => {
            const component = shallow(<Profile/>)
            expect(component).toMatchSnapshot()
        })
    })
    describe('<CardContainer/>', () => {
        const props = { 
            isLoading: false,
            email: 'test@user.com',
            profile: {},
            loadProfile: jest.fn()
        }
        it('should load profile on mount', () => {
            shallow(<CardContainer {...props}/>)
            expect(props.loadProfile).toHaveBeenCalledTimes(1)
        })
    })
    describe('<Card/>', () => {
        const props = { 
            email: 'test@user.com',
            profile: { name: 'John Doe', avatar: 'img.png' }
        }
        it('should render user profile', () => {
            const component = shallow(<Card {...props}/>)
            const avatar = component.find('img')
            expect(avatar.props().src).toEqual(props.profile.avatar)
            const name = component.find('h1')
            expect(name.text()).toEqual(props.profile.name)
            const email = component.find('h2')
            expect(email.text()).toEqual(props.email)
        })
    })
})