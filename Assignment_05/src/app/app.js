/* global document: true */

import angular from 'angular';
// import uiRouter from 'angular-ui-router';

// import AppComponent from './app.component';
import FirstCtrl from './FirstCtrl';
import OmdbService from './OmdbService';

angular.module('openmdbapp', [])
  .constant('config', {
    omdbUrl: 'http://www.omdbapi.com/?',
    omdbRespMovOnPage: 10,
    moviesOnPage: 7,
  })
  .controller('FirstCtrl', ['OmdbService', FirstCtrl])
  .factory('OmdbService',
    ['$httpParamSerializer', '$http', '$q', 'config', OmdbService]);

angular.bootstrap(document, ['openmdbapp']);
