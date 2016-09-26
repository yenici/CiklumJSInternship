/* global document: true */

import angular from 'angular';
// import uiRouter from 'angular-ui-router';

// import AppComponent from './app.component';
import FirstCtrl from './OmdbCtrl';
import OmdbService from './OmdbService';
import FavoritesService from './FavoritesService';

angular.module('openmdbapp', [])
  .constant('config', {
    omdbUrl: 'http://www.omdbapi.com/?',
    omdbRespMovOnPage: 10,
    moviesOnPage: 7,
  })
  .controller('OmdbCtrl', ['FavoritesService', 'OmdbService', FirstCtrl])
  .factory('FavoritesService', ['$window', FavoritesService])
  .factory('OmdbService',
    ['$httpParamSerializer', '$http', '$q', 'config', OmdbService]);

angular.bootstrap(document, ['openmdbapp']);
