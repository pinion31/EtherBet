import React from 'react';
import {
  render, cleanup,
} from 'react-testing-library';
import { ReduxWrapper, resetStore } from '../testHelpers/ReduxWrapper';
import Home from '../../src/components/Home.jsx';

afterEach(() => {
  cleanup();
  resetStore();
});

test('it loads and displays sports bar', () => {
  const { getByText } = render(
    <ReduxWrapper>
      <Home />
    </ReduxWrapper>,
  );

  expect(getByText('Today\'s Events')).toBeDefined();
});
