import PokeService from '../services/PokeService';

export const GET_FAVORITES_REQUEST = 'GET_FAVORITES_REQUEST';
export const getFavoritesRequest = () => ({
  type: GET_FAVORITES_REQUEST,
});

export const GET_FAVORITES_RESPONSE = 'GET_FAVORITES_RESPONSE';
export const getFavoritesResponse = ({ favorites = [], message = '' }, error = false) => ({
  type: GET_FAVORITES_RESPONSE,
  payload: {
    favorites,
    message,
  },
  error,
});

export const getFavorites = function getFavorites() {
  return (dispatch) => {
    dispatch(getFavoritesRequest());
    return PokeService.getFavorites()
      .then(response => dispatch(getFavoritesResponse({ favorites: response })))
      .catch(error => dispatch(getFavoritesResponse({ message: error.toString() }, true)));
  };
};

export const PIN_TO_FAVORITES_REQUEST = 'PIN_TO_FAVORITES_REQUEST';
export const pinToFavoritesRequest = () => ({
  type: PIN_TO_FAVORITES_REQUEST,
});

export const PIN_TO_FAVORITES_RESPONSE = 'PIN_TO_FAVORITES_RESPONSE';
export const pinToFavoritesResponse = ({ favorites = [], message = '' }, error = false) => ({
  type: PIN_TO_FAVORITES_RESPONSE,
  payload: {
    favorites,
    message,
  },
  error,
});

export const pinToFavorites = function pinToFavorites(pokemon) {
  return (dispatch) => {
    dispatch(pinToFavoritesRequest());
    return PokeService.pinToFavorites(pokemon)
      .then(response => dispatch(pinToFavoritesResponse({ favorites: response })))
      .catch(error => dispatch(pinToFavoritesResponse({ message: error.toString() }, true)));
  };
};

export const UNPIN_FROM_FAVORITES_REQUEST = 'UNPIN_FROM_FAVORITES_REQUEST';
export const unpinFromFavoritesRequest = () => ({
  type: UNPIN_FROM_FAVORITES_REQUEST,
});

export const UNPIN_FROM_FAVORITES_RESPONSE = 'UNPIN_FROM_FAVORITES_RESPONSE';
export const unpinFromFavoritesResponse = ({ favorites = [], message = '' }, error = false) => ({
  type: UNPIN_FROM_FAVORITES_RESPONSE,
  payload: {
    favorites,
    message,
  },
  error,
});

export const unpinFromFavorites = function unpinFromFavorites(pokemon) {
  return (dispatch) => {
    dispatch(unpinFromFavoritesRequest());
    return PokeService.unpinFromFavorites(pokemon)
      .then(response => dispatch(unpinFromFavoritesResponse({ favorites: response })))
      .catch(error => dispatch(unpinFromFavoritesResponse({ message: error.toString() }, true)));
  };
};

export const FILTER_FAVORITES_BY_TYPE = 'FILTER_FAVORITES_BY_TYPE';
export const filterFavoritesByType = filter => ({
  type: FILTER_FAVORITES_BY_TYPE,
  payload: {
    filter,
  },
});
