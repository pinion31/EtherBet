import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../../src/reducers/rootReducer';

const middleware = applyMiddleware(thunk);
export let store = createStore(rootReducer, middleware);

export const resetStore = () => store = createStore(rootReducer, middleware);

export const ReduxWrapper = props => (
  <Provider store={props.store || store}>
    <Router>
      {props.children}
    </Router>
  </Provider>

);
