/* global require, document: true */

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Components from './components/components';
import Common from './common/common';
import OmdbService from './services/omdb.service';

require('../stylesheets/main.scss');
require('../images/noposter.png');

const root = angular
  .module('root', [
    Components,
    Common,
    uiRouter,
  ])
  .service('OmdbService', OmdbService)
  .constant('config', {
    apiUrl: 'http://yeniomdb.herokuapp.com/api',
    omdbRespMovOnPage: 10,
    moviesOnPage: 20,
  })
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('home', {
        url: '/',
        component: 'home',
        resolve: {
          favoriteMovies: OmdbService => OmdbService.getFavorites(),
        },
      });
    $stateProvider
      .state('signin', {
        url: '/signin',
        component: 'signin',
      });
    $stateProvider
      .state('login', {
        url: '/login',
        component: 'login',
      });
    $stateProvider
      .state('logout', {
        url: '/logout',
        component: 'logout',
      });
    $stateProvider
      .state('search', {
        url: '/search/{query}',
        component: 'omdbmovies',
        resolve: {
          foundMovies: (OmdbService, $stateParams) =>
            OmdbService.searchMovie($stateParams.query.trim()),
          favoriteMovies: OmdbService => OmdbService.getFavorites(),
        },
      });
    $stateProvider
      .state('movie', {
        url: '/movie/{imdbID}',
        component: 'moviedetails',
        resolve: {
          movie: (OmdbService, $stateParams) =>
            OmdbService.getMovieDetails($stateParams.imdbID),
          previousState: [
            '$state',
            $state => ({
              Name: $state.current.name,
              Params: $state.params,
              URL: $state.href($state.current.name, $state.params),
            }),
          ],
        },
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

angular.bootstrap(document, [root]);
