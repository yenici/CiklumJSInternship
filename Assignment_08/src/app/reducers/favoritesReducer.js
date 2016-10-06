import {
  GET_FAVORITES_RESPONSE,
  PIN_TO_FAVORITES_RESPONSE,
  UNPIN_FROM_FAVORITES_RESPONSE,
  FILTER_FAVORITES_BY_TYPE,
} from '../actions/favorites';

const INITIAL_STATE = {
  favoritePokes: [],    // favorites Pokemons
  types: [],            // Types of favorite pokemons
  filter: 'all',        // Current filter
};

const favoritesReducer = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case GET_FAVORITES_RESPONSE:
    case PIN_TO_FAVORITES_RESPONSE:
    case UNPIN_FROM_FAVORITES_RESPONSE:
      if (!action.error) {
        newState = Object.assign(
          {}, state,
          {
            favoritePokes: action.payload.favorites,
          });
      } else {
        // TODO: Catch an error
      }
      break;
    case FILTER_FAVORITES_BY_TYPE:
      if (state.filter !== action.payload.filter) {
        newState = Object.assign({}, state, { filter: action.payload.filter });
      } else {
        newState = state;
      }
      break;
    default:
      newState = state;
  }
  return newState;
};

export default favoritesReducer;
