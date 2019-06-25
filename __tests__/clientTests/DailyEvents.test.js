import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { ReduxWrapper } from '../../src/components/ReduxWrapper';
import DailyEvents from '../../src/components/DailyEvents.jsx';

test('it loads and displays daily events elements', () => {
  const { getByText, queryAllByText } = render(
    <ReduxWrapper>
      <DailyEvents />
    </ReduxWrapper>,
  );

  expect(queryAllByText('Today\'s Events').length).toBe(2);
  expect(getByText('Login')).toBeDefined();
});
