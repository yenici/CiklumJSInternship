import angular from 'angular';

import MovieStoreComponent from './movie-store.component';
import SearchComponent from './search';
import FavoritesComponent from './favorites';
import MoviesTableComponent from './movies-table';
import FavoritesService from './favorites.service';
import OmdbService from './omdb.service';

const moviestore = angular
  .module('moviestore', [SearchComponent, FavoritesComponent, MoviesTableComponent])
  .component('moviestore', MovieStoreComponent)
  .service('OmdbService', OmdbService)
  .service('FavoritesService', FavoritesService)
  .constant('config', {
    omdbUrl: 'http://www.omdbapi.com/?',
    omdbRespMovOnPage: 10,
    moviesOnPage: 7,
  })
  .name;

export default moviestore;
