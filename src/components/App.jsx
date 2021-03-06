import React from 'react';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './Home.jsx';
import Landing from './Landing.jsx';
import DailyEvents from './DailyEvents.jsx';
import Stats from './Stats.jsx';
import Bets from './Bets.jsx';
import Signup from './Signup.jsx';
import rootReducer from '../reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk, logger);
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/sign-up" component={Signup} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/todays-events" component={DailyEvents} />
        <Route exact path="/your-bets" component={Bets} />
        <Route exact path="/stats" component={Stats} />
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
