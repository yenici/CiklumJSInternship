import controller from './favorites.controller';
import template from './favorites.html';

const FavoritesComponent = {
  bindings: {
    favoriteMovies: '<',
    onUnpinMovie: '&',
  },
  controller,
  template,
};

export default FavoritesComponent;
