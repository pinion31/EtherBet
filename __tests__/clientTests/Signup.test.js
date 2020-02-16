import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import axios from 'axios';
import { ReduxWrapper } from '../../src/components/ReduxWrapper';
import Signup from '../../src/components/Signup.jsx';

jest.mock('axios');

afterEach(cleanup);

const flushPromise = () => new Promise((resolve) => {
  setTimeout(resolve, 0);
});

test('it loads and displays signup elements', () => {
  const { getByText, getByLabelText } = render(
    <ReduxWrapper>
      <Signup />
    </ReduxWrapper>,
  );

  expect(getByLabelText('Username')).toBeDefined();
  expect(getByLabelText('Password')).toBeDefined();
  expect(getByLabelText('Confirm Password')).toBeDefined();
  expect(getByLabelText('Ether Address')).toBeDefined();
  expect(getByText('Sign up')).toBeDefined();
});

test('it displays error if attempting to login with missing fields', async () => {
  const {
    getByText, queryByText, getByLabelText, getAllByText, getByTestId
  } = render(
    <ReduxWrapper>
      <Signup />
    </ReduxWrapper>,
  );

  expect(queryByText('Please complete all fields.')).toBeNull();
  const [SignUpButton] = getAllByText('Sign up');
  const usernameNode = getByTestId('username-signup');
  const passwordNode = getByTestId('password-signup');
  const confirmPasswordNode = getByTestId('confirm-signup');
  const addressNode = getByTestId('address-signup');

  SignUpButton.click();
  expect(getByText('Please complete all fields.')).not.toBeNull();
  fireEvent.change(usernameNode, { target: { value: 'Chris' } });
  expect(queryByText('Please complete all fields.')).toBeNull();

  SignUpButton.click();
  expect(getByText('Please complete all fields.')).not.toBeNull();
  fireEvent.change(passwordNode, { target: { value: 'password' } });
  expect(queryByText('Please complete all fields.')).toBeNull();
  SignUpButton.click();
  expect(getByText('Please complete all fields.')).not.toBeNull();
  fireEvent.change(confirmPasswordNode, { target: { value: 'password' } });
  expect(queryByText('Please complete all fields.')).toBeNull();

  SignUpButton.click();
  expect(getByText('Please complete all fields.')).not.toBeNull();
  fireEvent.change(addressNode, { target: { value: 'address' } });
  expect(queryByText('Please complete all fields.')).toBeNull();

  fireEvent.change(confirmPasswordNode, { target: { value: 'password1' } });
  SignUpButton.click();
  expect(getByText('Passwords do not match.')).not.toBeNull();
});

test('it creates user', async () => {
  const fakeHistory = {
    push: jest.fn(),
  };
  const {
    getAllByText, getByTestId,
  } = render(
    <ReduxWrapper>
      <Signup history={fakeHistory} />
    </ReduxWrapper>,
  );

  const resp = { status: 200 };
  axios.post.mockResolvedValue(resp);

  const SignupButton = getAllByText('Sign up');
  const usernameNode = getByTestId('username-signup');
  const passwordNode = getByTestId('password-signup');
  const confirmPasswordNode = getByTestId('confirm-signup');
  const addressNode = getByTestId('address-signup');

  fireEvent.change(usernameNode, { target: { value: 'Chris' } });
  fireEvent.change(passwordNode, { target: { value: 'Mini' } });
  fireEvent.change(confirmPasswordNode, { target: { value: 'Mini' } });
  fireEvent.change(addressNode, { target: { value: 'Mini' } });

  SignupButton[0].click();

  // pauses until next event loop to make assertions
  await flushPromise();

  expect(fakeHistory.push).toHaveBeenCalledTimes(1);
  expect(fakeHistory.push).toHaveBeenCalledWith('/todays-events');
});

test('it handles 500 error', async () => {
  const fakeHistory = {
    push: jest.fn(),
  };
  const {
    getAllByText, getByTestId, getByText,
  } = render(
    <ReduxWrapper>
      <Signup history={fakeHistory} />
    </ReduxWrapper>,
  );

  const resp = { status: 500 };
  axios.post.mockRejectedValue(resp);

  const SignupButton = getAllByText('Sign up');
  const usernameNode = getByTestId('username-signup');
  const passwordNode = getByTestId('password-signup');
  const confirmPasswordNode = getByTestId('confirm-signup');
  const addressNode = getByTestId('address-signup');

  fireEvent.change(usernameNode, { target: { value: 'Chris' } });
  fireEvent.change(passwordNode, { target: { value: 'Mini' } });
  fireEvent.change(confirmPasswordNode, { target: { value: 'Mini' } });
  fireEvent.change(addressNode, { target: { value: 'Mini' } });

  SignupButton[0].click();

  // pauses until next event loop to make assertions
  await flushPromise();

  expect(fakeHistory.push).toHaveBeenCalledTimes(0);
  expect(getByText('There was an error creating your account.')).toBeDefined();
});
