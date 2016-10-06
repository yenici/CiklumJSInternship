import {
  GET_FAVORITES_REQUEST,
  GET_FAVORITES_RESPONSE,
  PIN_TO_FAVORITES_REQUEST,
  PIN_TO_FAVORITES_RESPONSE,
  UNPIN_FROM_FAVORITES_REQUEST,
  UNPIN_FROM_FAVORITES_RESPONSE,
} from '../actions/favorites';

import {
  GET_POKEMONS_CHUNK_REQUEST,
  GET_POKEMONS_CHUNK_RESPONSE,
} from '../actions/pokemones';

const INITIAL_STATE = {
  actionsInProgress: 0, // Number of actions in progress for spinner
};

const globalReducer = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case GET_FAVORITES_REQUEST:
    case PIN_TO_FAVORITES_REQUEST:
    case UNPIN_FROM_FAVORITES_REQUEST:
    case GET_POKEMONS_CHUNK_REQUEST:
      newState = Object.assign(
        {}, state,
        { actionsInProgress: state.actionsInProgress + 1 });
      break;
    case GET_FAVORITES_RESPONSE:
    case PIN_TO_FAVORITES_RESPONSE:
    case UNPIN_FROM_FAVORITES_RESPONSE:
    case GET_POKEMONS_CHUNK_RESPONSE:
      newState = Object.assign(
        {}, state,
        { actionsInProgress: state.actionsInProgress - 1 });
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

export default globalReducer;
