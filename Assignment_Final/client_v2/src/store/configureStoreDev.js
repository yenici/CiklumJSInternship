import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import Reducers from '../reducers/';

export default function configureStore() {
  // return createStore(Reducers, applyMiddleware(thunkMiddleware));
  return createStore(Reducers, applyMiddleware(thunkMiddleware, createLogger()));
}
