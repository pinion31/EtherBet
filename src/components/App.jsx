import React from 'react';
import Home from './Home.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
);

export default App;
