import controller from './movies-table.controller';
import template from './movies-table.html';

const MoviesTableComponent = {
  bindings: {
    allMovies: '<',
    onPinToFavorites: '&',
  },
  controller,
  template,
};

export default MoviesTableComponent;
