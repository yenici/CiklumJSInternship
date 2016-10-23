import controller from './found-movies.controller';
import template from './found-movies.html';

const FoundMoviesComponent = {
  bindings: {
    allMovies: '<',
    onPinToFavorites: '&',
  },
  controller,
  template,
};

export default FoundMoviesComponent;
