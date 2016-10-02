import angular from 'angular';

import MovieBriefComponent from './movie-brief';
import FavoritesComponent from './favorites';
import SpinnerComponent from './spinner';

const common = angular
  .module('app.common', [
    MovieBriefComponent,
    FavoritesComponent,
    SpinnerComponent,
  ])
  .name;

export default common;
