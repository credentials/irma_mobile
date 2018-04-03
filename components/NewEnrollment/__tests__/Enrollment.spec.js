/*global describe expect it*/
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Enrollment from '../';

const storeState = {
  enrollment: {status: 'started'}
};

describe('Enrollment', () => {

  it('renders as expected', () => {
    const wrapper = shallow(
      <Enrollment navigation={{}} />,
      { context: { store: configureStore()(storeState) } }
    );

    expect(wrapper.dive().dive()).toMatchSnapshot();
  });

});
