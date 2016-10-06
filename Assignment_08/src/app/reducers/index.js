import { combineReducers } from 'redux';

import favoritesReducer from './rootReducer';

const Reducers = combineReducers({
  favoritesReducer,
});

export default Reducers;
