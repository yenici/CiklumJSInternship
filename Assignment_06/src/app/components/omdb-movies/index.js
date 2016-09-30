import angular from 'angular';

import OmdbMoviesComponent from './omdb-movies.component';
import FavoritesComponent from './favorites';
import MovieBriefComponent from './movie-brief';
import SearchComponent from './search';
import FoundMoviesComponent from './found-movies';
import OmdbService from './omdb.service';

const omdbmovies = angular
  .module('omdbmovies',
  [
    FavoritesComponent,
    MovieBriefComponent,
    SearchComponent,
    FoundMoviesComponent,
  ])
  .component('omdbmovies', OmdbMoviesComponent)
  .service('OmdbService', OmdbService)
  .constant('config', {
    omdbUrl: 'http://www.omdbapi.com/?',
    omdbRespMovOnPage: 10,
    moviesOnPage: 20,
  })
  .name;

export default omdbmovies;
