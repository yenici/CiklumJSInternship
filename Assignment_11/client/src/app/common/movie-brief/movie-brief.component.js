import controller from './movie-brief.controller';
import template from './movie-brief.html';

const MovieBriefComponent = {
  bindings: {
    movie: '<',
    inFavorites: '<',
    onPinUnpinMovie: '&',
  },
  controller,
  template,
};

export default MovieBriefComponent;
