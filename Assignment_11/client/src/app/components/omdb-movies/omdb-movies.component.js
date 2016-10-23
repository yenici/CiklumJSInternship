import controller from './omdb-movies.controller';
import template from './omdb-movies.html';

const OmdbMoviesComponent = {
  bindings: {
    foundMovies: '<',
    favoriteMovies: '<',
  },
  controller,
  template,
};

export default OmdbMoviesComponent;
