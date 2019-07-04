import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { ReduxWrapper } from '../../src/components/ReduxWrapper';
import DailyEvents from '../../src/components/DailyEvents.jsx';

afterEach(cleanup);

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it loads and displays daily events elements', () => {
  const { getByText, queryAllByText, getAllByText } = render(
    <ReduxWrapper>
      <DailyEvents />
    </ReduxWrapper>,
  );

  expect(queryAllByText('Today\'s Events').length).toBe(2);
  expect(getByText('Portland Trail Blazers')).toBeDefined();
  expect(getByText('(53-29)')).toBeDefined();
  expect(getByText('@Denver Nuggets')).toBeDefined();
  expect(getByText('(54-28)')).toBeDefined();
  expect(getByText('Philadelphia 76ers')).toBeDefined();
  expect(getByText('(51-31)')).toBeDefined();
  expect(getByText('@Toronto Raptors')).toBeDefined();
  expect(getByText('(58-24)')).toBeDefined();
  expect(getAllByText('Away').length).toEqual(2);
  expect(getAllByText('Home').length).toEqual(2);
  expect(getAllByText('0').length).toEqual(4);
});

test('it displays create bet modal when create bet is clicked', async () => {
  const {
    getByText, getByLabelText, queryAllByText, getAllByText,
  } = render(
    <ReduxWrapper>
      <DailyEvents />
    </ReduxWrapper>,
  );

  const CreateBetButton = getAllByText('Create Bet');
  CreateBetButton[0].click();
  await flushPromise();
  expect(queryAllByText('Invite A Friend To Bet').length).toBe(1);
  expect(getByText('Bet:')).toBeDefined();
  expect(getByText('Wagering:')).toBeDefined();
  expect(getByText('Friend to offer bet:')).toBeDefined();
  expect(getByText('Cancel')).toBeDefined();
  expect(getByText('Propose Bet')).toBeDefined();
  expect(getByText('Amount in Wei')).toBeDefined();
  expect(getByText('Login of Friend')).toBeDefined();
});
