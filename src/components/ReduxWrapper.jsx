import React from 'react';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rootReducer from '../reducers/rootReducer';

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);

export const ReduxWrapper = props => (
  <Provider store={store}>
    <Router>
      {props.children}
    </Router>
  </Provider>

);
