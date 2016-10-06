import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Reducers from '../reducers/rootReducer';

export default function configureStore() {
  return createStore(
    Reducers,
    applyMiddleware(thunkMiddleware)
  );
}
