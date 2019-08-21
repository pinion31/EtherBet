import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { formatDate } from 'react-day-picker/moment';
import { ReduxWrapper, store, resetStore } from '../../src/components/ReduxWrapper';
import SportsBar from '../../src/components/functional/SportsBar.jsx';
import sportsEvents from '../responses/formattedSportsFromDB.json';
import sports from '../responses/sportsFromDb';
import events from '../responses/eventsWithMultipleSports';
import { Provider } from '../../src/components/ContextStore.js';

afterEach(() => {
  cleanup();
  resetStore();
});

Date.now = () => new Date(Date.UTC(2019, 6, 21, 0)).valueOf();

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it loads and displays sports bar', async () => {
  const {
    getByText, getByPlaceholderText,
  } = render(
    <ReduxWrapper>
      <SportsBar sportsList={sportsEvents} tabIndex={0} sportsEvents={sportsEvents} />
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

test('it loads correct events for date for sport with id of 1', async (done) => {
  store.dispatch({ type: 'GET_SPORTS', payload: sports });
  await flushPromise();
  const {
    queryAllByText, debug,
  } = render(
    <ReduxWrapper>
      <Provider value={{ handleToggleModal: () => {} }}>
        <SportsBar
          sportsList={sportsEvents}
          tabIndex={0}
          sportsEvents={events}
          selectedDate="2019-07-21"
        />
      </Provider>
    </ReduxWrapper>,
  );
  await flushPromise();
  // console.log(debug());
  expect(queryAllByText('Portland Trail Blazers').length).toBe(1);
  expect(queryAllByText('@Denver Nuggets').length).toBe(1);
  expect(queryAllByText('Sunday, July 21, 2019 2:30 PM CT').length).toBe(1);
  expect(queryAllByText('Home').length).toBe(1);
  expect(queryAllByText('Away').length).toBe(1);
  expect(queryAllByText('100').length).toBe(1);
  expect(queryAllByText('87').length).toBe(1);
  expect(queryAllByText('Add record of team').length).toBe(2);
  done();
});

test('it loads correct events for date for sport with id of 2', async (done) => {
  store.dispatch({ type: 'GET_SPORTS', payload: sports });
  await flushPromise();
  const {
    queryAllByText, debug,
  } = render(
    <ReduxWrapper>
      <Provider value={{ handleToggleModal: () => {} }}>
        <SportsBar
          sportsList={sportsEvents}
          tabIndex={1}
          sportsEvents={events}
          selectedDate="2019-07-21"
        />
      </Provider>
    </ReduxWrapper>,
  );
  await flushPromise();
  expect(queryAllByText('Philadelphia 76ers').length).toBe(1);
  expect(queryAllByText('@Toronto Raptors').length).toBe(1);
  expect(queryAllByText('Sunday, July 21, 2019 6:00 PM CT').length).toBe(1);
  expect(queryAllByText('Home').length).toBe(1);
  expect(queryAllByText('Away').length).toBe(1);
  expect(queryAllByText('123').length).toBe(1);
  expect(queryAllByText('101').length).toBe(1);
  expect(queryAllByText('Add record of team').length).toBe(2);
  done();
});
