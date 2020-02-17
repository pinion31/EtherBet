import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ReduxWrapper } from '../testHelpers/ReduxWrapper';
import MenuBar from '../../src/components/functional/MenuBar.jsx';

afterEach(cleanup);

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it loads and displays Bet Card', async () => {
  const { getByText } = render(
    <ReduxWrapper>
      <MenuBar />
    </ReduxWrapper>,
  );

  await flushPromise();
  expect(getByText('Today\'s Events')).toBeDefined();
  expect(getByText('Browse Events')).toBeDefined();
  expect(getByText('Your Bets')).toBeDefined();
});
