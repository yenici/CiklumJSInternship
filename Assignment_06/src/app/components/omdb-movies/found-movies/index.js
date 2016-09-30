import angular from 'angular';

import FoundMoviesComponent from './found-movies.component';
import MovieFilterComponent from './movie-filter';
import MovieSortComponent from './movie-sort';

const moviestable = angular
  .module('foundmovies', [MovieFilterComponent, MovieSortComponent])
  .component('foundmovies', FoundMoviesComponent)
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
