import controller from './movie-filter.controller';
import template from './movie-filter.html';

const MovieFilterComponent = {
  require: {
    parentComp: '^foundmovies',
  },
  bindings: {
    filterTypes: '<',
    filterExpr: '<',
    onFilterSet: '&',
  },
  controller,
  template,
};

export default MovieFilterComponent;
