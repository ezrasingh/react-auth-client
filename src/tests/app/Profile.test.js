import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'
import ProfilePage, { Profile, View } from 'app/Profile'
// Containers
import Menu from 'app/Profile/containers/Menu'
import Home, { HomeView } from 'app/Profile/containers/Home'
import Update, { UpdateView } from 'app/Profile/containers/Update'
// Components
import Avatar from 'app/Profile/components/Avatar'
import Content from 'app/Profile/components/Content'
import Tabs from 'app/Profile/components/Tabs'
import UpdateForm from 'app/Profile/components/UpdateForm'
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
                expect(component.equals(<Update/>)).toBe(true)
            })
        })
        describe('containers', () => {
            describe('<Home />', () => {
                const mockProps = { 
                    user: { profile: mockProfile }, 
                    loadProfile: jest.fn()
                }
                it('should load profile on mount', () => {
                    const component = shallow(<HomeView {...mockProps}/>)
                    expect(mockProps.loadProfile).toHaveBeenCalledTimes(1)
                })
            })
            describe('<Update />', () => {
                const mockProps = { name: '', update: jest.fn() }
                const event = { preventDefault: jest.fn() }
                it('should trigger update call on submit', () => {
                    const component = shallow(<UpdateView {...mockProps}/>)
                    component.props().handleSubmit(event)
                    expect(event.preventDefault).toHaveBeenCalledTimes(1)
                    expect(mockProps.update).toHaveBeenCalledTimes(1)
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
            describe('<UpdateForm />', () => {
                const mockProps = { name: 'John Doe', handleSubmit: jest.fn() }
                const component = shallow(<UpdateForm {...mockProps}/>)
                it('should render with name in placeholder', () => {
                    const input = component.find('input#name')
                    expect(input.props().placeholder).toEqual(mockProps.name)
                })
                it('should fire event on form submission', () => {
                    const form = component.find('form')
                    form.simulate('submit', { preventDefault: jest.fn() })
                    expect(mockProps.handleSubmit).toHaveBeenCalledTimes(1)
                })
            })
        })
    })
})