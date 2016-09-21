import getMovies from './getMovies';

export const MovieTypeFilter = {
  SHOW_ALL: 'all',
  SHOW_MOVIES: 'movie',
  SHOW_SERIES: 'series',
  SHOW_EPISODE: 'episode',
  SHOW_GAME: 'game',
};

export const MovieSortOrder = {
  SORT_NONE: 'None',
  SORT_BY_TITLE: 'Title',
  SORT_BY_TYPE: 'Type',
  SORT_BY_YEAR: 'Year',
};

/*
 *Action creators
 */

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export function requestMovies(query) {
  return {
    type: REQUEST_MOVIES,
    query,
  };
}

export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
export function receiveMovies(response) {
  return {
    type: RECEIVE_MOVIES,
    count: response.count,
    movies: response.movies,
  };
}

export function fetchMovies(query) {
  return (dispatch) => {
    dispatch(requestMovies(query));
    return getMovies(query)
      .then(response => dispatch(receiveMovies(response)))
      // TODO: Error listener
      .catch(error => console.error(error));
  };
}

export const SET_FILTER = 'SET_FILTER';
export function filterMovies(filter) {
  let filteredBy;
  switch (filter) {
    case MovieTypeFilter.SHOW_MOVIES:
    case MovieTypeFilter.SHOW_SERIES:
    case MovieTypeFilter.SHOW_EPISODE:
    case MovieTypeFilter.SHOW_GAME:
      filteredBy = filter;
      break;
    default:
      filteredBy = MovieTypeFilter.SHOW_ALL;
  }
  return {
    type: SET_FILTER,
    filter: filteredBy,
  };
}

export const SET_ORDER = 'SET_ORDER';
export function sortMovies(order) {
  let orderBy;
  switch (order) {
    case MovieSortOrder.SORT_BY_TITLE:
    case MovieSortOrder.SORT_BY_TYPE:
    case MovieSortOrder.SORT_BY_YEAR:
      orderBy = order;
      break;
    default:
      orderBy = MovieSortOrder.SORT_NONE;
  }
  return {
    type: SET_ORDER,
    order: orderBy,
  };
}

export const SET_PAGE = 'SET_PAGE';
export function moveToPage(page) {
  return {
    type: SET_PAGE,
    page,
  };
}

export const PIN_TO_FAVORITES = 'PIN_TO_FAVORITES';
export function pinToFavorites(movieId) {
  return {
    type: PIN_TO_FAVORITES,
    imdbId: movieId,
  };
}

export const UNPIN_FROM_FAVORITES = 'UNPIN_FROM_FAVORITES';
export function unpinFromFavorites(movieId) {
  return {
    type: UNPIN_FROM_FAVORITES,
    imdbId: movieId,
  };
}

// TODO: Implement thhis action
export const DISPLAY_DETAILS = 'DISPLAY_DETAILS';
export function displayMovieDetails(movieId) {
  return {
    type: DISPLAY_DETAILS,
    imdbId: movieId,
  };
}