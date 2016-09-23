/* global localStorage: true */

import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
  SET_FILTER, MovieTypeFilter,
  SET_ORDER, MovieSortOrder,
  SET_PAGE,
  PIN_TO_FAVORITES,
  UNPIN_FROM_FAVORITES,
} from '../Actions/actions';

const MOVIES_ON_PAGE = 7;

/**
 * Initial state of a store
 */
const initialAppState = {
  isFetching: false,
  searchQuery: '',
  searchResult: {
    count: 0,
    movies: [],
  },
  movies: [],
  favorites: JSON.parse(localStorage.getItem('FavoriteMovies')) || [],
  filter: MovieTypeFilter.SHOW_ALL,
  order: {
    name: MovieSortOrder.SORT_NONE,
  },
  paginator: {
    currentPage: 0,
    totalPages: 0,
    onPage: MOVIES_ON_PAGE,
  },
};

/**
 * Filter a search result to remove favorite movies
 * @param m - array of search results
 * @param f - array of favorite movies
 * @returns {*|Array.<T>|{ID, TAG, CLASS, ATTR, CHILD, PSEUDO}}
 */
function getMoviesWithoutFav(m, f) {
  return m.filter(
    movie => f.find(favorite => favorite.imdbID === movie.imdbID) === undefined);
}

/**
 * Comparator for sorting movies (ascending and descending)
 * @param key
 * @param descending
 * @returns {function(*, *)}
 */
function moviesComparator(key, descending) {
  return (a, b) => {
    let result;
    if (a[key] < b[key]) {
      result = -1;
    } else if (a[key] > b[key]) {
      result = 1;
    } else {
      result = 0;
    }
    if (descending === true) {
      return -result;
    }
    return result;
  };
}

/**
 * The Grand reduser.
 *
 * @param state
 * @param action
 * @returns  next state
 */
function rootReducer(state = initialAppState, action) {
  let newState;
  switch (action.type) {
    case REQUEST_MOVIES:
      newState = Object.assign(
        {},
        initialAppState,
        {
          isFetching: true,
          searchQuery: action.query,
          favorites: state.favorites,
        });
      break;
    case RECEIVE_MOVIES:
      if (action.count !== undefined) {
        const moviesButFav = getMoviesWithoutFav(action.movies, state.favorites);
        newState = Object.assign(
          {},
          state,
          {
            isFetching: false,
            searchResult: {
              count: action.count,
              movies: action.movies,
            },
            movies: moviesButFav,
            paginator: {
              currentPage: moviesButFav.length > 0 ? 1 : 0,
              totalPages: Math.ceil(moviesButFav.length / MOVIES_ON_PAGE),
              onPage: MOVIES_ON_PAGE,
            },
          });
      } else {
        newState = initialAppState;
      }
      break;
    case SET_FILTER:
      if (state.filter !== action.filter) {
        let newMovies;
        if (action.filter === MovieTypeFilter.SHOW_ALL) {
          newMovies = getMoviesWithoutFav(state.searchResult.movies, state.favorites);
        } else {
          newMovies = getMoviesWithoutFav(state.searchResult.movies, state.favorites)
            .filter(movie => movie.Type === action.filter);
        }
        newState = Object.assign(
          {},
          state,
          {
            movies: newMovies,
            filter: action.filter,
            order: {
              name: MovieSortOrder.SORT_NONE, // Reset order
            },
            paginator: {
              currentPage: newMovies.length > 0 ? 1 : 0, // Move to the 1st page
              totalPages: Math.ceil(newMovies.length / MOVIES_ON_PAGE),
              onPage: MOVIES_ON_PAGE,
            },
          }
        );
      } else {
        newState = state;
      }
      break;
    case SET_ORDER:
      if (state.movies.length > 0) {
        let sortedMovies;
        let ascending = true;
        switch (action.order) {
          case MovieSortOrder.SORT_BY_TITLE:
          case MovieSortOrder.SORT_BY_TYPE:
          case MovieSortOrder.SORT_BY_YEAR:
            if (state.order.name !== action.order) {
              sortedMovies = [].concat(state.movies.sort(moviesComparator(action.order)));
            } else {
              // Change the sort order
              ascending = !state.order.ascending;
              if (ascending) {
                sortedMovies = [].concat(state.movies.sort(moviesComparator(action.order)));
              } else {
                sortedMovies = [].concat(state.movies.sort(moviesComparator(action.order, true)));
              }
            }
            break;
          default:
            sortedMovies = [].concat(state.movies.sort(moviesComparator('imdbID')));
            break;
        }
        newState = Object.assign(
          {},
          state,
          {
            order: {
              name: action.order,
              ascending,
            },
            movies: sortedMovies,
            paginator: {
              currentPage: sortedMovies.length > 0 ? 1 : 0, // Move to the 1st page
              totalPages: state.paginator.totalPages,
              onPage: MOVIES_ON_PAGE,
            },
          }
        );
      } else {
        //  The list of movies is empty
        newState = state;
      }
      break;
    case SET_PAGE:
      {
        if (action.page > 0 && action.page <= state.paginator.totalPages) {
          newState = Object.assign(
            {},
            state,
            {
              paginator: {
                currentPage: action.page,
                totalPages: state.paginator.totalPages,
                onPage: MOVIES_ON_PAGE,
              },
            }
          );
        } else {
          newState = state;
        }
      }
      break;
    case PIN_TO_FAVORITES:
      {
        // TODO: We can pin a movie from the visible movies ONLY!
        // That's not bad :) because we guarantee the uniqueness of
        // the movies in favorites:
        //   visible movies = searched movies - favorites.
        const movieToPin = state.movies.find(movie => movie.imdbID === action.imdbId);
        if (movieToPin !== undefined) {
          const newFavorites = state.favorites.concat([movieToPin]);
          localStorage.setItem('FavoriteMovies', JSON.stringify(newFavorites));
          const newMovies = state.movies.filter(movie => movie.imdbID !== action.imdbId);
          const pages = Math.ceil(newMovies.length / MOVIES_ON_PAGE);
          newState = Object.assign(
            {},
            state,
            {
              movies: newMovies,
              favorites: newFavorites,
              paginator: {
                currentPage: state.paginator.currentPage > pages ?
                  pages : state.paginator.currentPage,
                totalPages: pages,
                onPage: MOVIES_ON_PAGE,
              },
            }
          );
        } else {
          newState = state;
        }
      }
      break;
    case UNPIN_FROM_FAVORITES:
      {
        // Remove the movie from favorites
        const newFavorites = state.favorites.filter(movie => movie.imdbID !== action.imdbId);
        if (newFavorites.length !== state.favorites.length) { // The movie was found in favorites
          localStorage.setItem('FavoriteMovies', JSON.stringify(newFavorites)); // Save favorites
          const movieFromFav = state.searchResult.movies    // Look for the removed movie in
            .find(movie => movie.imdbID === action.imdbId); // search results
          if (movieFromFav !== undefined) {
            // The unpinned movie is in the search result
            let newMovies = getMoviesWithoutFav(state.searchResult.movies, newFavorites);
            if (state.filter !== MovieTypeFilter.SHOW_ALL) {
              newMovies = newMovies.filter(movie => movie.Type === state.filter);
            }
            if (state.order.name !== MovieSortOrder.SORT_NONE) {
              if (state.order.ascending) {
                newMovies.sort(moviesComparator(state.order.name));
              } else {
                newMovies.sort(moviesComparator(state.order.name, true));
              }
            }
            if (state.movies.length !== newMovies.length) {
              // The unpinned movie is in visible movies list
              const totalPages = Math.ceil(newMovies.length / MOVIES_ON_PAGE);
              let currentPage;
              if (state.paginator.currentPage === 0) {
                // The unpinned movie is a single movie in visible movies list
                currentPage = 1;
              } else {
                // Trying to store the current page number
                currentPage = state.paginator.currentPage;
              }
              newState = Object.assign(
                {},
                state,
                {
                  movies: newMovies,
                  favorites: newFavorites,
                  paginator: {
                    currentPage,
                    totalPages,
                    onPage: MOVIES_ON_PAGE,
                  },
                }
              );
            } else {
              newState = Object.assign(
                {},
                state,
                {
                  favorites: newFavorites,
                }
              );
            }
          } else {
            // Unpinned movie does not affect the search result and visible movies
            newState = Object.assign(
              {},
              state,
              {
                favorites: newFavorites,
              }
            );
          }
        } else {
          newState = state;
        }
      }
      break;
    // TODO: Implement the action
    // case DISPLAY_DETAILS:
    //   break;
    default:
      newState = state;
  }
  return newState;
}

export default rootReducer;
