import controller from './movie-details.controller';
import template from './movie-details.html';

const MovieDetailsComponent = {
  bindings: {
    movie: '<',
    previousState: '<',
  },
  controller,
  template,
};

export default MovieDetailsComponent;
