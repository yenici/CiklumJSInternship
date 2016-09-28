import angular from 'angular';

import FavoritesComponent from './favorites.component';

const favorites = angular
  .module('favorites', [])
  .component('favorites', FavoritesComponent)
  .name;

export default favorites;
