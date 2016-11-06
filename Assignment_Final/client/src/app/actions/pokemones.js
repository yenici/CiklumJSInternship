import PokeService from '../services/PokeService';

export const GET_POKEMONS_CHUNK_REQUEST = 'GET_POKEMONS_CHUNK_REQUEST';
export const getPokemonsChunkRequest = () => ({
  type: GET_POKEMONS_CHUNK_REQUEST,
});

export const GET_POKEMONS_CHUNK_RESPONSE = 'GET_POKEMONS_CHUNK_RESPONSE';
export const getPokemonsChunkResponse =
  ({ next = '', pokemons = [], message = '' }, error = false) => ({
    type: GET_POKEMONS_CHUNK_RESPONSE,
    payload: {
      next,
      pokemons,
      message,
    },
    error,
  });

export const getPokemonsChunk = function getPokemonsChunk(url) {
  return (dispatch) => {
    dispatch(getPokemonsChunkRequest());
    return PokeService.getChunk(url)
      .then(response => dispatch(getPokemonsChunkResponse(response)))
      .catch(error => dispatch(getPokemonsChunkResponse({ message: error.toString() }, true)));
  };
};

export const FILTER_POKEMONS_BY_TYPE = 'FILTER_POKEMONS_BY_TYPE';
export const filterPokemonsByType = filter => ({
  type: FILTER_POKEMONS_BY_TYPE,
  payload: {
    filter,
  },
});
