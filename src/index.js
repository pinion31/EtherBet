//import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello World1</h1>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}