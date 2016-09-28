import angular from 'angular';

import MoviesTableComponent from './movies-table.component';

const moviestable = angular
  .module('moviestable', [])
  .component('moviestable', MoviesTableComponent)
  .filter('pageFilter', config => (input, page) => {
    if (input.length > 0) {
      if (page <= Math.ceil(input.length / config.moviesOnPage)) {
        return input
          .slice((page - 1) * config.moviesOnPage,
            Math.min(page * config.moviesOnPage, input.length));
      }
    }
    return input;
  }, ['config'])
  .name;

export default moviestable;
