import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { ReduxWrapper } from '../../src/components/ReduxWrapper';
import Signup from '../../src/components/Signup.jsx';

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

test('it displays error if attempting to login with missing fields', () => {
  const {
    getByText, queryByText, getByLabelText, getAllByText,
  } = render(
    <ReduxWrapper>
      <Signup />
    </ReduxWrapper>,
  );

  expect(queryByText('Please complete all fields.')).toBeNull();
  const [SignUpButton] = getAllByText('Sign up');
  const usernameNode = getByLabelText('Username');
  const passwordNode = getByLabelText('Password');
  const confirmPasswordNode = getByLabelText('Confirm Password');
  const addressNode = getByLabelText('Ether Address');

  SignUpButton.click();
  expect(getByText('Please complete all fields.')).toBeDefined();
  fireEvent.change(usernameNode, { target: { value: 'Chris' } });
  expect(queryByText('Please complete all fields.')).toBeNull();

  SignUpButton.click();
  expect(getByText('Please complete all fields.')).toBeDefined();
  fireEvent.change(passwordNode, { target: { value: 'password' } });
  expect(queryByText('Please complete all fields.')).toBeNull();

  SignUpButton.click();
  expect(getByText('Please complete all fields.')).toBeDefined();
  fireEvent.change(confirmPasswordNode, { target: { value: 'password' } });
  expect(queryByText('Please complete all fields.')).toBeNull();

  SignUpButton.click();
  expect(getByText('Please complete all fields.')).toBeDefined();
  fireEvent.change(addressNode, { target: { value: 'address' } });
  expect(queryByText('Please complete all fields.')).toBeNull();

  fireEvent.change(confirmPasswordNode, { target: { value: 'password1' } });
  SignUpButton.click();
  expect(getByText('Passwords do not match.')).toBeDefined();
});
