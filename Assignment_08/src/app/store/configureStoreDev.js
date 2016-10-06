import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import Reducers from '../reducers/rootReducer';

export default function configureStore() {
  return createStore(
    Reducers,
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    )
  );
}
