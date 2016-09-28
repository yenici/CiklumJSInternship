import angular from 'angular';
import MovieStore from './movie-store';
import MovieDetails from './movie-details';
// import Events from './events';

const components = angular
  .module('app.components', [
    MovieStore,
    MovieDetails,
    // Events
  ])
  .name;

export default components;
