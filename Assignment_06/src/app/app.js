/* global require, document: true */

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Components from './components/components';
import OmdbService from './components/movie-store/omdb.service';

require('../stylesheets/main.scss');

const root = angular
  .module('root', [
    Components,
    uiRouter,
  ])
  .service('OmdbService', OmdbService)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('moviestore', {
        url: '/',
        component: 'moviestore',
      });
    $stateProvider
      .state('moviestore.movie', {
        url: '/{imdbID}',
        component: 'moviedetails',
        resolve: {
          movie: (OmdbService, $stateParams) => OmdbService.getMovieDetails($stateParams.imdbID),
        },
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

angular.bootstrap(document, [root]);
