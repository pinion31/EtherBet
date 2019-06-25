import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { ReduxWrapper } from '../../src/components/ReduxWrapper';
import Login from '../../src/components/Login.jsx';

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
