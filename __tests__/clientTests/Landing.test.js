import React from 'react';
import {
  render, fireEvent, cleanup,
} from 'react-testing-library';
import axios from 'axios';
import { ReduxWrapper } from '../../src/components/ReduxWrapper';
import Landing from '../../src/components/Landing.jsx';
import sportsFromDB from '../responses/sportsFromDb.json';
import formattedEvents from '../responses/formattedEvents.json';

Date.now = jest.fn(() => new Date(Date.UTC(2019, 4, 12, 5)).valueOf());

console.log('date', new Date(Date.now()));
jest.mock('axios');

afterEach(cleanup);

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it loads and displays landing page elements', async () => {
  axios.get.mockResolvedValueOnce({ data: sportsFromDB });
  axios.get.mockResolvedValueOnce({ data: formattedEvents });

  const { getByText, queryByText, queryAllByText } = render(
    <ReduxWrapper>
      <Landing />
    </ReduxWrapper>,
  );

  await flushPromise();
  expect(getByText('Featured Games')).toBeDefined();
  expect(getByText('Today\'s Games')).toBeDefined();
  expect(getByText('Sports News')).toBeDefined();

  expect(getByText('Etherbet')).toBeDefined();
  expect(getByText('Sign Up')).toBeDefined();
  expect(getByText('Login')).toBeDefined();


  expect(getByText('NFL')).toBeDefined();
  expect(queryByText('CFL')).toBeNull();
  expect(queryByText('WNBA')).toBeNull();
  expect(getByText('NHL')).toBeDefined();
  expect(getByText('NBA')).toBeDefined();
  expect(getByText('NCAA Men\'s Basketball')).toBeDefined();
  expect(getByText('NCAA Football')).toBeDefined();
  expect(getByText('UFC/MMA')).toBeDefined();

  expect(queryAllByText('Sun May 12').length).toBe(2);
  expect(queryAllByText('Portland Trail Blazers').length).toBe(2);
  expect(queryAllByText('Denver Nuggets').length).toBe(2);
  expect(getByText('2:30 PM')).toBeDefined();
  expect(queryAllByText('Toronto Raptors').length).toBe(2);
  expect(queryAllByText('Philadelphia 76ers').length).toBe(2);
  expect(getByText('6:00 PM')).toBeDefined();
  expect(queryAllByText('Bet Now').length).toBe(2);
});

test('it displays login modal when user click event login', async () => {
  axios.get.mockResolvedValueOnce({ data: sportsFromDB });
  axios.get.mockResolvedValueOnce({ data: formattedEvents });

  const { getByText, getByPlaceholderText, getAllByText, queryAllByText } = render(
    <ReduxWrapper>
      <Landing />
    </ReduxWrapper>,
  );
  await flushPromise();
  const BetNowButton = getAllByText('Bet Now');
  BetNowButton[0].click();
  expect(getByText('Login:')).toBeDefined();
  expect(getByText('Password:')).toBeDefined();
  expect(queryAllByText('Login').length).toBe(3);
  expect(getByText('Cancel')).toBeDefined();
  expect(getByPlaceholderText('User Login')).toBeDefined();
  expect(getByPlaceholderText('Password')).toBeDefined();
});

test('it displays error if attempting to login with empty fields', async () => {
  axios.get.mockResolvedValueOnce({ data: sportsFromDB });
  axios.get.mockResolvedValueOnce({ data: formattedEvents });

  const {
    getByText, queryByText, getByLabelText, getAllByText, getAllByTestId,
  } = render(
    <ReduxWrapper>
      <Landing />
    </ReduxWrapper>,
  );

  await flushPromise();
  expect(queryByText('Please complete all fields.')).toBeNull();
  const LoginButton = getAllByText('Login');
  const usernameNode = getAllByTestId('username-bar');
  const passwordNode = getAllByTestId('password-bar');
  expect(queryByText('Error!')).toBeNull();
  expect(queryByText('OK')).toBeNull();
  LoginButton[0].click();

  expect(getByText('Please complete all fields.')).toBeDefined();
  expect(getByText('Error!')).toBeDefined();
  expect(getByText('OK')).toBeDefined();
  const OkButton = getAllByText('OK');
  OkButton[0].click();
  //console.log('length', queryByText('Error!'));
  //console.log('OkButton[0]', OkButton[0]);
  //expect(queryByText('Error!')).toBeNull();
  //expect(queryByText('OK')).toBeNull();

  fireEvent.change(usernameNode[0], { target: { value: 'Chris' } });
  expect(queryByText('Please complete all fields.')).toBeNull();
  LoginButton[0].click();
  expect(getByText('Please complete all fields.')).toBeDefined();
  fireEvent.change(passwordNode[0], { target: { value: 'Mini' } });
  expect(queryByText('Please complete all fields.')).toBeNull();
});

test('it displays error if incorrect login', async () => {
  axios.get.mockResolvedValueOnce({ data: sportsFromDB });
  axios.get.mockResolvedValueOnce({ data: formattedEvents });

  const fakeHistory = {
    push: jest.fn(),
  };
  const {
    getAllByText, getAllByTestId, getByText,
  } = render(
    <ReduxWrapper>
      <Landing history={fakeHistory} />
    </ReduxWrapper>,
  );

  const resp = { status: 200, data: { error: 'Invalid username/password' } };
  axios.post.mockResolvedValue(resp);

  const LoginButton = getAllByText('Login');
  const usernameNode = getAllByTestId('username-bar');
  const passwordNode = getAllByTestId('password-bar');

  fireEvent.change(usernameNode[0], { target: { value: 'invalid user' } });
  fireEvent.change(passwordNode[0], { target: { value: 'Mini' } });


  LoginButton[0].click();
  await flushPromise();

  expect(fakeHistory.push).toHaveBeenCalledTimes(0);
  expect(getByText('Invalid username/password')).toBeDefined();
});
