import angular from 'angular';

import Home from './home.component';
import SearchComponent from './search';

const main = angular
  .module('home', [
    SearchComponent,
  ])
  .component('home', Home)
  .name;

export default main;
