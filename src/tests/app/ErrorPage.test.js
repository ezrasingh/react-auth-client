import React from 'react'
import { shallow, mount } from 'enzyme'
import ga from 'react-ga'
import ErrorPage from 'app'

ga.initialize(process.env.REACT_APP_GTAG_ID, { testMode: true })

describe('<ErrorPage />', () => {
    const props = { history: { goBack: jest.fn() } }
    it('should render', () => {
        const component = shallow(<ErrorPage {...props}/>)
        expect(component).toMatchSnapshot()
    })
    it('should trigger Google Analytics event', () => {
        shallow(<ErrorPage {...props}/>)
        const expectedCalls = [ 
            [ 'create', process.env.REACT_APP_GTAG_ID, 'auto' ],
        ]
        expect(ga.testModeAPI.calls).toEqual(expectedCalls)
    })
})