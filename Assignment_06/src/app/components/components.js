import angular from 'angular';
import OmdbMovies from './omdb-movies';
// import MovieDetails from './movie-details';
// import Events from './events';

const components = angular
  .module('app.components', [
    OmdbMovies,
    // MovieDetails,
    // Events
  ])
  .name;

export default components;
