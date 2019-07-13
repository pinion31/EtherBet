import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import axios from 'axios';
import { ReduxWrapper, store, resetStore } from '../../src/components/ReduxWrapper';
import CreateBetModal from '../../src/components/functional/CreateBetModal.jsx';
import compiledEvents from '../responses/compiledEvents';
import mockBet from '../responses/mockBet';
import mockBet2 from '../responses/mockBet2';

afterEach(() => {
  cleanup();
  resetStore();
});

jest.mock('axios');

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it displays create bet modal correctly', () => {
  const {
    getByText, getByPlaceholderText,
  } = render(
    <ReduxWrapper>
      <CreateBetModal
        modalOpen
        toggleBetModal={() => {}}
        handleChange={() => {}}
        selectedEvent={0}
        events={{}}
      />
    </ReduxWrapper>,
  );

  expect(getByText('Invite A Friend To Bet')).toBeDefined();
  expect(getByText('Bet:')).toBeDefined();
  expect(getByText('Wagering:')).toBeDefined();
  expect(getByText('Friend to offer bet:')).toBeDefined();
  expect(getByPlaceholderText('Login of Friend')).toBeDefined();
  expect(getByPlaceholderText('Amount in Wei')).toBeDefined();
  expect(getByText('Propose Bet')).toBeDefined();
  expect(getByText('Cancel')).toBeDefined();
});


test('it calls toggleBetModal when user select cancel', async () => {
  const cancel = jest.fn();
  const {
    getByText, queryAllByText, getAllByText, getByLabelText,
  } = render(
    <ReduxWrapper>
      <CreateBetModal
        modalOpen
        toggleBetModal={cancel}
        handleChange={() => {}}
        selectedEvent={0}
        events={{}}
      />
    </ReduxWrapper>,
  );

  const cancelButton = getAllByText('Cancel');
  cancelButton[0].click();
  await flushPromise();

  expect(cancel).toHaveBeenCalledTimes(1);
});

test('it creates bet when propose bet is selected', async () => {
  const toggleBetModal = jest.fn();

  const resp = { data: mockBet };
  axios.post.mockResolvedValue(resp);

  const {
    getAllByText, getByPlaceholderText, getByDisplayValue,
  } = render(
    <ReduxWrapper>
      <CreateBetModal
        modalOpen
        toggleBetModal={toggleBetModal}
        handleChange={() => {}}
        selectedEvent={0}
        events={compiledEvents}
      />
    </ReduxWrapper>,
  );

  const teamSelectNode = getByDisplayValue('Select Winner');
  const amountNode = getByPlaceholderText('Amount in Wei');
  const friendNode = getByPlaceholderText('Login of Friend');

  fireEvent.change(teamSelectNode, { target: { value: 'Portland Trail Blazers' } });
  fireEvent.change(amountNode, { target: { value: 10 } });
  fireEvent.change(friendNode, { target: { value: 'lucy' } });

  const createBetButton = getAllByText('Propose Bet');
  createBetButton[0].click();
  await flushPromise();

  const { bets: [firstBet] } = store.getState();
  const betsCopy = [{ ...firstBet }];
  expect(toggleBetModal).toHaveBeenCalledTimes(1);
  expect(betsCopy).toEqual([mockBet]);
});


test('it retains current state when adding a new bet', async () => {
  const toggleBetModal = jest.fn();

  const resp = { data: mockBet };
  const resp2 = { data: mockBet2 };
  axios.post.mockResolvedValueOnce(resp);
  axios.post.mockResolvedValueOnce(resp2);


  const {
    getAllByText, getByPlaceholderText, getByDisplayValue,
  } = render(
    <ReduxWrapper>
      <CreateBetModal
        modalOpen
        toggleBetModal={toggleBetModal}
        handleChange={() => {}}
        selectedEvent={0}
        events={compiledEvents}
      />
    </ReduxWrapper>,
  );

  const teamSelectNode = getByDisplayValue('Select Winner');
  const amountNode = getByPlaceholderText('Amount in Wei');
  const friendNode = getByPlaceholderText('Login of Friend');

  fireEvent.change(teamSelectNode, { target: { value: 'Portland Trail Blazers' } });
  fireEvent.change(amountNode, { target: { value: 10 } });
  fireEvent.change(friendNode, { target: { value: 'lucy' } });

  const createBetButton = getAllByText('Propose Bet');
  createBetButton[0].click();
  await flushPromise();

  fireEvent.change(teamSelectNode, { target: { value: 'Toronto Raptors' } });
  fireEvent.change(amountNode, { target: { value: 222 } });
  fireEvent.change(friendNode, { target: { value: 'lucy' } });
  createBetButton[0].click();
  await flushPromise();
  const { bets: [firstBet, secondBet] } = store.getState();
  const betsCopy = [{ ...firstBet }, { ...secondBet }];
  expect(toggleBetModal).toHaveBeenCalledTimes(2);
  expect(betsCopy).toEqual([mockBet, mockBet2]);
});

test('it displays error message when creating bet for invalid user', async () => {

});

test('it displays error message when a user tries to create a bet for himself', async () => {

});
