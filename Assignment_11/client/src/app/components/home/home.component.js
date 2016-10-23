import controller from './home.controller';
import template from './home.html';

const HomeComponent = {
  bindings: {
    favoriteMovies: '<',
  },
  controller,
  template,
};

export default HomeComponent;
