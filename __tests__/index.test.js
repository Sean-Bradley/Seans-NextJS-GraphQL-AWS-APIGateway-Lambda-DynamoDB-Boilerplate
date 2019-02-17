/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import App from '../pages/index.js'

describe('With Enzyme', () => {
  it('App shows "seans nextjs, graphql, aws, apigateway, lambda, dynamodb boilerplate"', () => {
    const app = shallow(<App />)
    expect(app.find('h2').text()).toEqual('seans nextjs, graphql, aws, apigateway, lambda, dynamodb boilerplate')
  })
})

describe('With Snapshot Testing', () => {
  it('App shows "seans nextjs, graphql, aws, apigateway, lambda, dynamodb boilerplate"', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
