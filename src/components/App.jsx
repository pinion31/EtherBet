import React from 'react';
import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Home from './Home.jsx';
import Login from './Login.jsx';
import rootReducer from '../reducers/rootReducer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

const App = () => (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </Router>
    </Provider>
);

export default App;
