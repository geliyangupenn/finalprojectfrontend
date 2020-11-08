import React from 'react';
import { render, screen } from '@testing-library/react';

import LoginPage from './userLoginAuth';

const renderer = require('react-test-renderer');

// snapshot testing
test('LoginPage matches snapshot', () => {
  const component = renderer.create(<LoginPage/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
