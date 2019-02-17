import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Dogs from './dogs';


describe('Dogs', () => {
  it('should render <h1>Birds</h1>', () => {
    const wrapper = shallow(<Dogs />);
    expect(wrapper.containsAllMatchingElements([
      <h1>Dogs</h1>
    ])).to.equal(true);
  });

  it('should contain a link to cats', () => {
    const wrapper = shallow(<Dogs />);
    expect(wrapper.containsAllMatchingElements([
      <a>Cats</a>
    ])).to.equal(true);
  });
});


