import angular from 'angular';

import Start from './start.component';
import SearchComponent from './search';

const main = angular
  .module('start', [
    SearchComponent,
  ])
  .component('start', Start)
  .name;

export default main;
