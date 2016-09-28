/* global require, document: true */

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Components from './components/components';

require('../stylesheets/main.scss');

const root = angular
  .module('root', [
    Components,
    uiRouter,
  ])
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('moviestore', {
        url: '/',
        component: 'moviestore',
      });
    $urlRouterProvider.otherwise('/');
  })
  .name;

angular.bootstrap(document, [root]);
