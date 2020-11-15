import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';

const renderer = require('react-test-renderer');

// snapshot testing
test('ProfilePage matches snapshot', () => {
  const component = renderer.create(<ProfilePage username="john" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
