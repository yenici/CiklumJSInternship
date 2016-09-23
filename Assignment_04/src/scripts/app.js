/* global require: true */

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'; // Comment for NODE_ENV=production!
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './Reducers/reducer';
import MoviesTable from './Views/MoviesTable';
import SearchMovie from './Views/SearchMovie';
import Paginator from './Views/Paginator';
import Favorites from './Views/Favorites';
import FilterMovies from './Views/FilterMovies';
import Spinner from './Views/Spinner';

const appStore = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    createLogger()   // neat middleware that logs actions. Comment for NODE_ENV=production!
  )
);

const handleChanges = function handleChanges(storeParam) {
  // Creating controls and hiding them in a closure
  const moviesTable = new MoviesTable('js-movies', appStore);
  const paginator = new Paginator('js-paginator', appStore);
  const searchMovie = new SearchMovie('js-search', appStore);
  const favorites = new Favorites('js-favorites', appStore);
  const filterMovies = new FilterMovies('js-filter', appStore);
  const spinner = new Spinner('js-spinner', appStore);
  const store = storeParam;
  let storedState = store.getState(); // Storing current state

  return () => {
    const newState = store.getState();
    if (storedState.isFetching !== newState.isFetching) {
      spinner.render();
    }
    if (storedState.movies !== newState.movies) {
      moviesTable.render();
    }
    if (storedState.favorites !== newState.favorites) {
      favorites.render();
    }
    if (storedState.filter !== newState.filter) {
      filterMovies.render();
    }
    if (storedState.paginator !== newState.paginator) {
      // TODO: IMHO we should invoke ONLY ONE render method
      moviesTable.render();
      paginator.render();
    }
    storedState = newState; // Updating store
  };
};

appStore.subscribe(handleChanges(appStore));

// Problem with posters.
// http://stackoverflow.com/questions/24595262/how-to-use-media-imdb-com-images-on-a-website
// http://stackoverflow.com/questions/14336919/not-allowed-to-fetch-image-from-url-but-is-from-another
// Currently in North America today the principal advertising size for a
// movie poster is 27" x 40" commonly referred to as the one sheet.
