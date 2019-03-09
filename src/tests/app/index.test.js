import React from 'react'
import { shallow } from 'enzyme'
import App from 'app'

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