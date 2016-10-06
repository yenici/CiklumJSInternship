import { combineReducers } from 'redux';

import globalReducer from './globalReducer';
import pokemonsReducer from './pokemonsReducer';
import favoritesReducer from './favoritesReducer';

const Reducers = combineReducers({
  globalState: globalReducer,
  pokemonsState: pokemonsReducer,
  favoritesState: favoritesReducer,
});

export default Reducers;
