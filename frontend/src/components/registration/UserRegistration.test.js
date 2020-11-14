import React from 'react';
import { render, screen } from '@testing-library/react';
import UserRegistration from './UserRegistration';

const renderer = require('react-test-renderer');

// snapshot testing
test('UserRegistration matches snapshot', () => {
  const component = renderer.create(<UserRegistration />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});