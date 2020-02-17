import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import axios from 'axios';
import { ReduxWrapper, store, resetStore } from '../../src/components/ReduxWrapper';
import DailyEvents from '../../src/components/DailyEvents.jsx';
import mockBet from '../responses/mockBet';
import mockBet2 from '../responses/mockBet2';
import events from '../responses/events';

Date.now = jest.fn(() => new Date(Date.UTC(2019, 6, 21, 8)).valueOf());

afterEach(() => {
  cleanup();
  resetStore();
});
axios.mockReset();
jest.mock('axios');

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it loads and displays daily events elements (if not logged in)', async () => {
  axios.get.mockResolvedValueOnce({ data: [events[4], events[6]] }); // this must be before render call
  const resp = { data: [mockBet, mockBet2] };
  axios.post.mockResolvedValueOnce(resp);
  const { getByText, queryAllByText, getAllByText } = render(
    <ReduxWrapper>
      <DailyEvents />
    </ReduxWrapper>,
  );

  await flushPromise();
  expect(queryAllByText('Today\'s Events').length).toBe(1);
  expect(getByText('Washington Nationals')).toBeDefined();
  expect(getByText('@Atlanta Braves')).toBeDefined();
  expect(getByText('New York Mets')).toBeDefined();
  expect(getByText('@San Francisco Giants')).toBeDefined();
  expect(getAllByText('Away').length).toEqual(2);
  expect(getAllByText('Home').length).toEqual(2);
  expect(getAllByText('0').length).toEqual(2);
  expect(getAllByText('2').length).toEqual(2);
});

test('it displays create bet modal when create bet is clicked', async () => {
  axios.get.mockResolvedValueOnce({ data: [events[4], events[6]] }); // this must be before render call
  const resp = { data: [mockBet, mockBet2] };
  axios.post.mockResolvedValueOnce(resp);

  const {
    getByText, queryAllByText, getAllByText, getByPlaceholderText,
  } = render(
    <ReduxWrapper>
      <DailyEvents />
    </ReduxWrapper>,
  );

  await flushPromise();
  expect(getByText('Washington Nationals')).toBeDefined();
  expect(getByText('@Atlanta Braves')).toBeDefined();
  expect(getByText('New York Mets')).toBeDefined();
  expect(getByText('@San Francisco Giants')).toBeDefined();

  const CreateBetButton = getAllByText('Create Bet');
  CreateBetButton[0].click();
  await flushPromise();
  expect(queryAllByText('Invite A Friend To Bet').length).toBe(1);
  expect(getByText('Bet:')).toBeDefined();
  expect(getByText('Wagering:')).toBeDefined();
  expect(getByText('Friend to offer bet:')).toBeDefined();
  expect(getByText('Cancel')).toBeDefined();
  expect(getByText('Propose Bet')).toBeDefined();
  expect(getByPlaceholderText('Amount in Wei')).toBeDefined();
  expect(getByPlaceholderText('Login of Friend')).toBeDefined();
});

test('it retrieves a users current bets', async () => {
  axios.get.mockResolvedValueOnce({ data: [events[4], events[6]] }); // this must be before render call
  const resp = { data: [mockBet, mockBet2] };
  axios.post.mockResolvedValueOnce(resp);

  render(
    <ReduxWrapper>
      <DailyEvents />
    </ReduxWrapper>,
  );


  await flushPromise();
  const { bets: [firstBet, secondBet] } = store.getState();
  const betsCopy = [{ ...firstBet }, { ...secondBet }];


  expect(betsCopy).toEqual([mockBet, mockBet2]);
});
