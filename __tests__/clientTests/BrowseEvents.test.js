import React from 'react';
import {
  render, fireEvent, cleanup, queryByText, queryAllByDisplayValue,
} from 'react-testing-library';
import { ReduxWrapper, store, resetStore } from '../../src/components/ReduxWrapper';
import Home from '../../src/components/Home.jsx';
import sports from '../responses/sportsFromDb';
import events from '../responses/eventsForToday';

afterEach(() => {
  cleanup();
  resetStore();
});

test('it loads and displays sports bar', () => {
  const { getByText, queryAllByText, getAllByText } = render(
    <ReduxWrapper>
      <Home />
    </ReduxWrapper>,
  );

  expect(getByText('Today\'s Events')).toBeDefined();
});

// test('it loads correct events for date', async (done) => {
//   store.dispatch({ type: 'GET_SPORTS', payload: sports });
//   store.dispatch({ type: 'GET_EVENTS_FOR_DAY', payload: events });
//   await flushPromise();
//   const {
//     container, baseElement, getByText, queryAllByText, getAllByText, getByTestId, findByPlaceholderText, queryAllByDisplayValue, getByTitle, debug,
//   } = render(
//     <ReduxWrapper>
//       <Home />
//     </ReduxWrapper>,
//   );
//   await flushPromise();
//   // const browseLink = getAllByText('Browse Events');
//   // browseLink[0].click();
//   console.log('current date', new Date(Date.now()));
//   const input = getByTestId('date-picker');
//   fireEvent.change(input, { target: { value: '07/21/2019' } });
//   fireEvent.focusOut(input);
//   await flushPromise();
//   console.log('input **************************', input);
//   await flushPromise();
//   const NBATab = getAllByText('NBA');
//   NBATab[0].click();
//   await flushPromise();
//   console.log('query', queryAllByText('Portland Trail Blazers'));
//   // console.log('query2', queryAllByDisplayValue('Portland Trail Blazers'));
//   // console.log('query3', getByTitle('Portland Trail Blazers'));
//   console.log(debug());
//   expect(queryAllByText('Portland Trail Blazers').length).toBe(1);
//   expect(queryAllByText('Denver Nuggets').length).toBe(1);
//   // expect(getByText('Denver Nuggets')).toBeDefined();
//   done();
//   // inputNode.then((res) => {
//   //   console.log('res', res);
//   //   done();
//   // });

//   // calendarNode.setValue('07/21/2019');
//   // console.log('calendarNode2', calendarNode);
//   // fireEvent.change(calendarNode, { target: { value: '07/21/2019' } });
// });
