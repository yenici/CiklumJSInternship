/* global require, document: true */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Router from './routes';

require('../stylesheets/main.scss');

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('app')
);
