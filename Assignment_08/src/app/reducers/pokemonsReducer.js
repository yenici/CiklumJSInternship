import {
  GET_POKEMONS_CHUNK_RESPONSE,
  FILTER_POKEMONS_BY_TYPE,
} from '../actions/pokemones';

const INITIAL_STATE = {
  fetchedPokes: [],     // fetched from server Pokemons
  next: undefined,      // Link to next Pokemon chunk
  types: [],            // Types of pokemons
  filter: 'all',        // Current filter
};

const rootReducer = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case GET_POKEMONS_CHUNK_RESPONSE:
      if (!action.error) {
        newState = Object.assign(
          {}, state,
          {
            next: action.payload.next,
            fetchedPokes: state.fetchedPokes.concat(action.payload.pokemons),
          });
      } else {
        // TODO: Catch an error
        newState = state;
      }
      break;
    case FILTER_POKEMONS_BY_TYPE:
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

export default rootReducer;
