import React from 'react';
import { render } from 'react-testing-library';
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
  expect(getByText('Create Account ')).toBeDefined();
});
