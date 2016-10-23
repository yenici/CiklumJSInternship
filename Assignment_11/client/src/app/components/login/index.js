import angular from 'angular';

import LoginComponent from './login.component';

const login = angular
  .module('login', [])
  .component('login', LoginComponent)
  .name;

export default login;
