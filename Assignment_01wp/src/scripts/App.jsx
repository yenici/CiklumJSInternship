/* global require, document: true */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import booksAppReducers from './reducers';
import BooksApp from './components/BooksApp.jsx';

require('../index.html');
require('../stylesheets/main.scss');
require('../images/favicon.ico');
require('../images/logo_jsbooks.png');
require('../images/logo_pythonbooks.png');
require('../images/revologo.png');

const store = createStore(booksAppReducers);
render(
  <Provider store={store}>
    <BooksApp />
  </Provider>,
  document.getElementById('js-books-app')
);

