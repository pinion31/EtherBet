import React from 'react';
import {
  render, fireEvent, cleanup,
} from 'react-testing-library';
import { ReduxWrapper, store, resetStore } from '../../src/components/ReduxWrapper';
import Home from '../../src/components/Home.jsx';
import sports from '../responses/sportsFromDb';
import events from '../responses/eventsForToday';

afterEach(() => {
  cleanup();
  resetStore();
});

test('it loads and displays sports bar', () => {
  const { getByText, queryAllByText, getAllByText } = render(
    <ReduxWrapper>
      <Home />
    </ReduxWrapper>,
  );

  expect(getByText('Today\'s Events')).toBeDefined();
});
