import React from 'react';
import {
  render, fireEvent, cleanup, wait,
} from 'react-testing-library';
import axios from 'axios';
import { ReduxWrapper } from '../../src/components/ReduxWrapper';
import Login from '../../src/components/Login.jsx';

jest.mock('axios');

afterEach(cleanup);

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it loads and displays login elements', () => {
  const { getByText, getByLabelText } = render(
    <ReduxWrapper>
      <Login />
    </ReduxWrapper>,
  );

  expect(getByLabelText('Username')).toBeDefined();
  expect(getByLabelText('Password')).toBeDefined();
  expect(getByText('Login')).toBeDefined();
  expect(getByText('Create Account')).toBeDefined();
});

test('it displays error if attempting to login with empty fields', () => {
  const {
    getByText, queryByText, getByLabelText, getAllByText,
  } = render(
    <ReduxWrapper>
      <Login />
    </ReduxWrapper>,
  );

  expect(queryByText('Please complete all fields.')).toBeNull();
  const LoginButton = getAllByText('Login');
  const usernameNode = getByLabelText('Username');
  const passwordNode = getByLabelText('Password');
  LoginButton[0].click();

  expect(getByText('Please complete all fields.')).toBeDefined();
  fireEvent.change(usernameNode, { target: { value: 'Chris' } });
  expect(queryByText('Please complete all fields.')).toBeNull();
  LoginButton[0].click();
  expect(getByText('Please complete all fields.')).toBeDefined();
  fireEvent.change(passwordNode, { target: { value: 'Mini' } });
  expect(queryByText('Please complete all fields.')).toBeNull();
});

test('it logs in user', async () => {
  const fakeHistory = {
    push: jest.fn(),
  };
  const {
    getAllByText, getByLabelText,
  } = render(
    <ReduxWrapper>
      <Login history={fakeHistory} />
    </ReduxWrapper>,
  );

  const resp = { status: 200 };
  axios.post.mockResolvedValue(resp);

  const LoginButton = getAllByText('Login');
  const usernameNode = getByLabelText('Username');
  const passwordNode = getByLabelText('Password');

  fireEvent.change(usernameNode, { target: { value: 'Chris' } });
  fireEvent.change(passwordNode, { target: { value: 'Mini' } });

  LoginButton[0].click();

  // pauses until next event loop to make assertions
  await flushPromise();

  expect(fakeHistory.push).toHaveBeenCalledTimes(1);
  expect(fakeHistory.push).toHaveBeenCalledWith('/todays-events');
});

test('it display error if error logging in', async () => {
  const fakeHistory = {
    push: jest.fn(),
  };
  const {
    getAllByText, getByLabelText, getByText,
  } = render(
    <ReduxWrapper>
      <Login history={fakeHistory} />
    </ReduxWrapper>,
  );

  const resp = { status: 500 };
  axios.post.mockResolvedValue(resp);

  const LoginButton = getAllByText('Login');
  const usernameNode = getByLabelText('Username');
  const passwordNode = getByLabelText('Password');

  fireEvent.change(usernameNode, { target: { value: 'Chris' } });
  fireEvent.change(passwordNode, { target: { value: 'Mini' } });


  LoginButton[0].click();
  await flushPromise();

  expect(fakeHistory.push).toHaveBeenCalledTimes(0);
  expect(getByText('Log in Error')).toBeDefined();
});

test('it handles 500 error', async () => {
  const fakeHistory = {
    push: jest.fn(),
  };
  const {
    getAllByText, getByLabelText, getByText,
  } = render(
    <ReduxWrapper>
      <Login history={fakeHistory} />
    </ReduxWrapper>,
  );

  const resp = { status: 500 };
  axios.post.mockRejectedValue(resp);

  const LoginButton = getAllByText('Login');
  const usernameNode = getByLabelText('Username');
  const passwordNode = getByLabelText('Password');

  fireEvent.change(usernameNode, { target: { value: 'Chris' } });
  fireEvent.change(passwordNode, { target: { value: 'Mini' } });


  LoginButton[0].click();
  await flushPromise();

  expect(fakeHistory.push).toHaveBeenCalledTimes(0);
  expect(getByText('Log in Error')).toBeDefined();
});

test('it redirects to sign up page', async () => {
  const fakeHistory = {
    push: jest.fn(),
  };
  const {
    getAllByText, getByLabelText,
  } = render(
    <ReduxWrapper>
      <Login history={fakeHistory} />
    </ReduxWrapper>,
  );

  const resp = { status: 200 };
  axios.post.mockResolvedValue(resp);

  const CreateAccountButton = getAllByText('Create Account');
  CreateAccountButton[0].click();

  // pauses until next event loop to make assertions
  await flushPromise();

  expect(fakeHistory.push).toHaveBeenCalledTimes(1);
  expect(fakeHistory.push).toHaveBeenCalledWith('/sign-up');
});
