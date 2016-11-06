/* global require, document: true */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Router from './routes.jsx';

import configureStore from './store/configureStore';

require('../stylesheets/main.scss');

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('app')
);
