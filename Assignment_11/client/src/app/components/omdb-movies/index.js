import angular from 'angular';

import OmdbMoviesComponent from './omdb-movies.component';
import FoundMoviesComponent from './found-movies';

const omdbmovies = angular
  .module('omdbmovies',
  [
    FoundMoviesComponent,
  ])
  .component('omdbmovies', OmdbMoviesComponent)
  .name;

export default omdbmovies;
