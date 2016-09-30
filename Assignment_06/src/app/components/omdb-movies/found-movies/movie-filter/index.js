import angular from 'angular';

import MovieFilterComponent from './movie-filter.component';

const moviefilter = angular
  .module('moviefilter', [])
  .component('moviefilter', MovieFilterComponent)
  .name;

export default moviefilter;
