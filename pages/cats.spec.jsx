import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Cats from './cats';

describe('Cats', () => {
  it('should render <h1>Cats</h1>', () => {
    const wrapper = shallow(<Cats />);
    expect(wrapper.containsAllMatchingElements([
      <h1>Cats</h1>
    ])).to.equal(true);
  });
});
