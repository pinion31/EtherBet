import React from 'react';
import {
  render, cleanup,
} from 'react-testing-library';
import { formatDate } from 'react-day-picker/moment';
import { ReduxWrapper, resetStore, store } from '../testHelpers/ReduxWrapper';
import sports from '../responses/sportsFromDb';
import Home from '../../src/components/Home.jsx';

afterEach(() => {
  cleanup();
  resetStore();
});

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it loads and displays sports bar', async () => {
  store.dispatch({ type: 'GET_SPORTS', payload: sports });
  await flushPromise();

  const { getByText, getByPlaceholderText } = render(
    <ReduxWrapper>
      <Home />
    </ReduxWrapper>,
  );

  await flushPromise();

  expect(getByPlaceholderText(`${formatDate(new Date(Date.now()))}`)).toBeDefined();
  expect(getByText('NCAA Football')).toBeDefined();
  expect(getByText('NFL')).toBeDefined();
  expect(getByText('MLB')).toBeDefined();
  expect(getByText('NBA')).toBeDefined();
  expect(getByText('NCAA Men\'s Basketball')).toBeDefined();
  expect(getByText('NHL')).toBeDefined();
  expect(getByText('UFC/MMA')).toBeDefined();
  expect(getByText('WNBA')).toBeDefined();
});
