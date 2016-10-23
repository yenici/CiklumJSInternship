import angular from 'angular';

import SigninComponent from './signin.component';

const signin = angular
  .module('signin', [])
  .component('signin', SigninComponent)
  .name;

export default signin;
