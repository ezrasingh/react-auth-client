import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'
import ProfilePage, { Profile, View } from 'app/Profile'
// Containers
import Menu from 'app/Profile/containers/Menu'
import Home, { HomeView } from 'app/Profile/containers/Home'
import Settings, { SettingsView } from 'app/Profile/containers/Settings'
// Components
import Avatar from 'app/Profile/components/Avatar'
import Content from 'app/Profile/components/Content'
import Tabs from 'app/Profile/components/Tabs'
import UpdateProfile from 'app/Profile/components/UpdateProfile'
import UpdateAccount from 'app/Profile/components/UpdateAccount'
import Footer from 'app/components/Footer'

describe('profile page', () => {
    const mockProfile = { name: '', avatar: null }
    const mockRouter = { params: { action: '' } }
    describe('<Profile/>', () => {
        it('should render with proper markup', () => {
            const component = shallow(<Profile match={mockRouter}/>)
            expect(component.children().first().equals(<Menu/>)).toBe(true)
            expect(component.children().last().equals(<Footer/>)).toBe(true)
        })
        describe('<View />', () => {
            beforeEach(() => {
                mockRouter.params.action = ''
            })
            it('should redirect on default', () => {
                const component = shallow(<View {...mockRouter.params}/>)
                expect(component.equals(<Redirect to="/profile/home"/>)).toBe(true)
            })
            it('should render home view', () => {
                mockRouter.params.action = 'home'
                const component = shallow(<View {...mockRouter.params}/>)
                expect(component.equals(<Home/>)).toBe(true)
            })
            it('should render update view', () => {
                mockRouter.params.action = 'update'
                const component = shallow(<View {...mockRouter.params}/>)
                expect(component.equals(<Settings/>)).toBe(true)
            })
        })
        describe('containers', () => {
            const mockUser = { email: 'tester@email.com', profile: mockProfile }
            describe('<Home />', () => {
                it('should render', () => {
                    const component = shallow(<Home user={mockUser}/>)
                    expect(component).toMatchSnapshot()
                })
            })
            describe('<Settings />', () => {
                const props = { user: mockUser, update: jest.fn(), deactivate: jest.fn(), delete: jest.fn() }
                const event = { preventDefault: jest.fn() }
                const component = shallow(<SettingsView {...props}/>)
                props.update.mockReturnValue(jest.fn())
                beforeEach(() => {
                    event.preventDefault = jest.fn()
                })
                it('should trigger update on profile update form submission', () => {
                    const updateProfile = component.find('UpdateProfile')
                    updateProfile.props().handleSubmit(event)
                    expect(event.preventDefault).toHaveBeenCalledTimes(1)
                    expect(props.update).toHaveBeenCalledWith('profile')
                })
               it('should trigger update on account update form submission', () => {
                   const updateAccount = component.find('UpdateAccount')
                   updateAccount.props().handleSubmit(event)
                   expect(event.preventDefault).toHaveBeenCalledTimes(1)
               }) 
            })
        })
        describe('components', () => {
            describe('<Avatar />', () => {
                beforeEach(() => {
                    mockProfile.avatar = null
                })
                it('should render with profile im', () => {
                    mockProfile.avatar = '/my-custom-avatar.jpg'
                    const component = shallow(<Avatar profile={mockProfile}/>)
                    const image = component.find('img')
                    expect(image.props().src).toEqual('/my-custom-avatar.jpg')
                    expect(component).toMatchSnapshot()
                })
                it('should render default avatar when profile img is missing', () => {
                    const component = shallow(<Avatar profile={mockProfile}/>)
                    const image = component.find('img')
                    expect(image.props().src).toEqual(process.env.REACT_APP_DEFAULT_AVATAR)
                })
            })
            describe('<Content />', () => {
                const component = shallow(<Content/>)
                expect(component).toMatchSnapshot()
            })
            describe('<Tabs />', () => {
                const mockItems = [ 
                    { name: 'foo', href: '/foo' },
                    { name: 'bar', href: '/bar' }
                ]
                it('should render menu items', () => {
                    const component = shallow(<Tabs items={mockItems}/>)
                    const container = component.find('ul')
                    expect(container.children().length).toEqual(mockItems.length)
                })
            })
            describe('<UpdateProfile />', () => {
                const props = { name: 'John Doe', handleSubmit: jest.fn() }
                const component = shallow(<UpdateProfile {...props}/>)
                it('should render with name split into default values', () => {
                    const [ firstName, lastName ] = props.name.split(' ')
                    expect(component.find('input#first_name').props().defaultValue).toEqual(firstName)
                    expect(component.find('input#last_name').props().defaultValue).toEqual(lastName)
                })
                it('should fire event on form submission', () => {
                    const form = component.find('form')
                    form.simulate('submit', { preventDefault: jest.fn() })
                    expect(props.handleSubmit).toHaveBeenCalledTimes(1)
                })
            })
            describe('<UpdateAccount />', () => {
                const props = { email: 'tester@email.com', handleSubmit: jest.fn() }
                const component = shallow(<UpdateAccount {...props}/>)
                it('should render old email in placeholder', () => {
                    const input = component.find('input#new_email')
                    expect(input.props().placeholder).toEqual(props.email)
                })
                it('should fire event on form submission', () => {
                    const form = component.find('form')
                    form.simulate('submit', { preventDefault: jest.fn() })
                    expect(props.handleSubmit).toHaveBeenCalledTimes(1)
                })
            })
        })
    })
})