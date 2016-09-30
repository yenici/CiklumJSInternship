import controller from './movie-sort.controller';
import template from './movie-sort.html';

const MovieSortComponent = {
  require: {
    parentComp: '^foundmovies',
  },
  bindings: {
    orderExpr: '<',
    orderDesc: '<',
    onOrderSet: '&',
  },
  controller,
  template,
};

export default MovieSortComponent;
