import angular from 'angular';
import MovieStore from './movie-store';
// import Events from './events';

const components = angular
  .module('app.components', [
    MovieStore,
    // Events
  ])
  .name;

export default components;
