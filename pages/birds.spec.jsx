import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Birds from './birds';

describe('Birds', () => {
  it('should render <h1>Birds</h1>', () => {
    const wrapper = shallow(<Birds />);
    expect(wrapper.containsAllMatchingElements([
      <h1>Birds</h1>
    ])).to.equal(true);
  });

  it('should contain a link to cats', () => {
    const wrapper = shallow(<Birds />);
    expect(wrapper.containsAllMatchingElements([
      <a>Cats</a>
    ])).to.equal(true);
  });
});


