import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { formatDate } from 'react-day-picker/moment';
import { ReduxWrapper } from '../../src/components/ReduxWrapper';
import SportsBar from '../../src/components/functional/SportsBar.jsx';
import sports from '../responses/sports.json';
import sportsEvents from '../responses/sportsEvents.json';

afterEach(cleanup);

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it loads and displays sports bar', () => {
  const {
    getByText, queryAllByText, getAllByTex, getByPlaceholderText,
  } = render(
    <ReduxWrapper>
      <SportsBar sportsList={sports.sports} tabIndex={0} sportsEvents={sportsEvents} />
    </ReduxWrapper>,
  );

  expect(getByPlaceholderText(`${formatDate(new Date())}`)).toBeDefined();
  expect(getByText('NCAA Football')).toBeDefined();
  expect(getByText('NFL')).toBeDefined();
  expect(getByText('MLB')).toBeDefined();
  expect(getByText('NBA')).toBeDefined();
  expect(getByText('NCAA Men\'s Basketball')).toBeDefined();
  expect(getByText('NHL')).toBeDefined();
  expect(getByText('UFC/MMA')).toBeDefined();
  expect(getByText('WNBA')).toBeDefined();
});
