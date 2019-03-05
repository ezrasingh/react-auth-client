import React from 'react'
import { shallow } from 'enzyme'
import Footer from 'app/components/Footer'
import Loader from 'app/components/Loader'
import Navbar, { withNav } from 'app/components/Navbar'

describe('app components', () =>{
    describe('<Footer />', () => {
        it('should render', () => {
            const component = shallow(<Footer/>)
            expect(component).toMatchSnapshot()
        })
    })
    describe('<Loader />', () => {
        it('should render', () => {
            const component = shallow(<Loader/>)
            expect(component).toMatchSnapshot()
        })
    })
    describe('<Navbar />', () => {
        it('should render', () => {
            const component = shallow(<Navbar/>)
            expect(component).toMatchSnapshot()
        })
        describe('withNav HOC', () => {
            const MockComponent = () => <div id="MOCK-CONTENT"/>
            const WrappedComponent = withNav(MockComponent)
            it('should wrap component with Navbar and container', () => {
                const component = shallow(<WrappedComponent/>)
                const container = component.find('div.navbar-container')
                expect(component.children().first().equals(<Navbar/>)).toBe(true)
                expect(container.contains(<MockComponent/>)).toBe(true)
            })
        })
    })
})