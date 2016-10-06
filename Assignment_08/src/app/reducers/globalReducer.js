import {
  GET_FAVORITES_REQUEST,
  GET_FAVORITES_RESPONSE,
  PIN_TO_FAVORITES_REQUEST,
  PIN_TO_FAVORITES_RESPONSE,
  UNPIN_FROM_FAVORITES_REQUEST,
  UNPIN_FROM_FAVORITES_RESPONSE,
  FILTER_FAVORITES_BY_TYPE,
} from '../actions/favorites';

const INITIAL_STATE = {
  actionsInProgress: 0, // Number of actions in progress for spinner
  favoritePokes: [],    // favorites Pokemons
  fetchedPokes: [],     // fetched from server Pokemons
  next: undefined,      // Link to next Pokemon chunk
  filter: 'all',        // Current filter
};

const rootReducer = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case GET_FAVORITES_REQUEST:
    case GET_POKEMONS_CHUNK_REQUEST:
    case PIN_TO_FAVORITES_REQUEST:
    case UNPIN_FROM_FAVORITES_REQUEST:
      newState = Object.assign(
        {}, state,
        { actionsInProgress: state.actionsInProgress + 1 });
      break;
    case GET_FAVORITES_RESPONSE:
    case PIN_TO_FAVORITES_RESPONSE:
    case UNPIN_FROM_FAVORITES_RESPONSE:
      if (!action.error) {
        newState = Object.assign(
          {}, state,
          {
            actionsInProgress: state.actionsInProgress - 1,
            favoritePokes: action.payload.favorites,
          });
      } else {
        // TODO: Catch an error
        newState = Object.assign({}, state, { actionsInProgress: state.actionsInProgress - 1 });
      }
      break;
    case FILTER_FAVORITES_BY_TYPE:
      if (state.filter !== action.payload.filter) {
        newState = Object.assign({}, state, { filter: action.payload.filter });
      } else {
        newState = state;
      }
      break;
    case GET_POKEMONS_CHUNK_RESPONSE:
      if (!action.error) {
        newState = Object.assign(
          {}, state,
          {
            next: action.payload.next,
            actionsInProgress: state.actionsInProgress - 1,
            fetchedPokes: state.fetchedPokes.concat(action.payload.pokemons),
          });
      } else {
        // TODO: Catch an error
        newState = Object.assign({}, state, { actionsInProgress: state.actionsInProgress - 1 });
      }
      break;
    default:
      newState = state;
  }
  return newState;
};

export default rootReducer;
