/* global require, document: true */

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Components from './components/components';
// import OmdbService from './components/omdb-movies/omdb.service';

require('../stylesheets/main.scss');
require('../images/noposter.png');

const root = angular
  .module('root', [
    Components,
    uiRouter,
  ])
  // .service('OmdbService', OmdbService)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('omdbmovies', {
        url: '/',
        component: 'omdbmovies',
      });
    // $stateProvider
    //   .state('moviestore', {
    //     url: '/old',
    //     component: 'moviestore',
    //   });
    // $stateProvider
    //   .state('moviestore.movie', {
    //     url: '/{imdbID}',
    //     component: 'moviedetails',
    //     resolve: {
    //       movie: (OmdbService, $stateParams) => OmdbService.getMovieDetails($stateParams.imdbID),
    //     },
    //   });
    $urlRouterProvider.otherwise('/');
  })
  .name;

angular.bootstrap(document, [root]);
