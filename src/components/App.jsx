import React from 'react';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Home from './Home.jsx';
import Login from './Login.jsx';
import DailyEvents from './DailyEvents.jsx';
import Stats from './Stats.jsx';
import Bets from './Bets.jsx';
import Signup from './Signup.jsx';
import rootReducer from '../reducers/rootReducer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

const App = () => (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/sign-up" component={Signup} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/todays-events" component={DailyEvents} />
        <Route exact path="/your-bets" component={Bets} />
        <Route exact path="/stats" component={Stats} />
      </Router>
    </Provider>
);

export default App;
