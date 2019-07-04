import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { ReduxWrapper } from '../../src/components/ReduxWrapper';
import Home from '../../src/components/Home.jsx';

afterEach(cleanup);

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it loads and displays sports bar', () => {
  const { getByText, queryAllByText, getAllByText } = render(
    <ReduxWrapper>
      <Home />
    </ReduxWrapper>,
  );

  expect(getByText('Today\'s Events')).toBeDefined();
});
