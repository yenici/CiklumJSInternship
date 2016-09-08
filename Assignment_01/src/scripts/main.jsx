/* global document: true */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import booksAppReducers from './reducers';
import BooksApp from './components/BooksApp.jsx';

const store = createStore(booksAppReducers);

render(
  <Provider store={store}>
    <BooksApp />
  </Provider>,
  document.getElementById('js-books-app')
);
