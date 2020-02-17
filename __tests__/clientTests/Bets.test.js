import React from 'react';
import { render, cleanup } from 'react-testing-library';
import axios from 'axios';
import { ReduxWrapper, store, resetStore } from '../testHelpers/ReduxWrapper';
import Bets from '../../src/components/Bets.jsx';
import mockBetsInStates from '../responses/mockBetsInVariousStates';

afterEach(() => {
  cleanup();
  resetStore();
});

jest.mock('axios');

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it retrieves a users current bets in various states', async () => {
  // prepopulate state
  store.dispatch({ type: 'GET_BETS', payload: mockBetsInStates });
  store.dispatch({ type: 'GET_USER', payload: { id: 18 } });
  await flushPromise();
  const {
    getByText, queryAllByText,
  } = render(
    <ReduxWrapper>
      <Bets />
    </ReduxWrapper>,
  );

  await flushPromise();

  expect(getByText('Bets You Have Accepted')).toBeDefined();
  expect(getByText('Bets You Have Created')).toBeDefined();
  expect(getByText('Bets You Have Been Offered')).toBeDefined();
  expect(getByText('Portland Trail Blazers vs Denver Nuggets')).toBeDefined();
  expect(getByText('Dallas Cowboys vs New York Giants')).toBeDefined();
  expect(getByText('Philadelphia 76ers vs Toronto Raptors')).toBeDefined();

  expect(getByText('Wager: 50 eth')).toBeDefined();
  expect(getByText('Wager: 100 eth')).toBeDefined();
  expect(getByText('Wager: 300 eth')).toBeDefined();

  expect(getByText('Status: ACCEPTED')).toBeDefined();
  expect(queryAllByText('Status: OFFER PENDING').length).toBe(2);

  expect(getByText('Bet: Portland Trail Blazers to win by 10pts')).toBeDefined();
  expect(getByText('Bet: Toronto Raptors to win by 10pts')).toBeDefined();
  expect(getByText('Bet: Dallas Cowboys to win by 10pts')).toBeDefined();

  expect(queryAllByText('Betting Against: lucy').length).toBe(3);

  expect(getByText('Date of Event: 05/12/2019')).toBeDefined();
  expect(getByText('Date of Event: 05/13/2019')).toBeDefined();
  expect(getByText('Date of Event: 05/14/2019')).toBeDefined();

  expect(queryAllByText('Accept Bet').length).toBe(1);
  expect(queryAllByText('Reject Bet').length).toBe(1);
});

test('it accepts bet when users selects accept', async () => {
  axios.post.mockResolvedValueOnce({ data: { status: 'ACCEPTED' } });

  // prepopulate state
  store.dispatch({ type: 'GET_BETS', payload: mockBetsInStates });
  store.dispatch({ type: 'GET_USER', payload: { id: 18 } });
  const { bets: [firstBet, secondBet, thirdBet] } = store.getState();
  const betsCopy = [{ ...firstBet }, { ...secondBet }, { ...thirdBet }];
  betsCopy[1].status = 'ACCEPTED';

  await flushPromise();
  const {
    getAllByText, queryAllByText,
  } = render(
    <ReduxWrapper>
      <Bets />
    </ReduxWrapper>,
  );

  const acceptBetButton = getAllByText('Accept Bet');
  acceptBetButton[0].click();

  await flushPromise();

  expect(betsCopy).toEqual(mockBetsInStates);

  expect(queryAllByText('Accept Bet').length).toBe(0);
  expect(queryAllByText('Reject Bet').length).toBe(0);

  expect(queryAllByText('Status: OFFER PENDING').length).toBe(1);
  expect(queryAllByText('Status: ACCEPTED').length).toBe(2);
});
