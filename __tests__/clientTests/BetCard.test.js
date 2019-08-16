import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { ReduxWrapper } from '../../src/components/ReduxWrapper';
import BetCard from '../../src/components/functional/BetCard.jsx';
import bet from '../responses/mockBet';

afterEach(cleanup);

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it loads and displays sports bar', async () => {
  const { getByText, queryAllByText, getAllByText } = render(
    <ReduxWrapper>
      <BetCard
        bet={bet}
        key={bet.id}
        type="OFFER"
        index={0}
        acceptBet={() => {}}
        opponent={bet.betCreatorLogin}
      />
    </ReduxWrapper>,
  );

  await flushPromise();
  expect(getByText('Date of Event: 05/12/2019')).toBeDefined();
  expect(getByText('Portland Trail Blazers vs Denver Nuggets')).toBeDefined();
  expect(getByText('Wager: 10 eth')).toBeDefined();
  expect(getByText('Wager: 10 eth')).toBeDefined();
  expect(getByText('Betting Against: chris')).toBeDefined();
  expect(getByText('Bet: Portland Trail Blazers to win by 10pts')).toBeDefined();
  expect(getByText('Status: OFFER PENDING')).toBeDefined();

  expect(queryAllByText('Accept Bet').length).toBe(1);
  expect(queryAllByText('Reject Bet').length).toBe(1);
});
