import React from 'react'
import { shallow } from 'enzyme'
import ga from 'react-ga'
import App from 'app'

ga.initialize(process.env.REACT_APP_GTAG_ID, { testMode: true })

describe("<App />", () => {
    beforeAll(() => {
        Object.defineProperty(global, 'document', {
            getElementById: jest.fn()
        })
    })
    it("should render", () => {
        const component = shallow(<App/>)
        expect(component).toMatchSnapshot()
    })
})