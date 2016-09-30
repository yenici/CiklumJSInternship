import angular from 'angular';

import MovieSortComponent from './movie-sort.component';

const moviesort = angular
  .module('moviesort', [])
  .component('moviesort', MovieSortComponent)
  .name;

export default moviesort;
