import React from 'react'
import Home from '../src/components/Home.jsx';
import  { render } from 'react-testing-library';

test('it loads and displays events', () => {
  const { container, getByText, getAllByText } = render(
    <Home />
  );

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

test('it displays another sport when clicking different tab', () => {
  const { getAllByText }  = render(
    <Home />
  );

  const NFLTab = getAllByText('NFL');
  NFLTab[0].click();

  //console.log('component', NFLTab);

});
