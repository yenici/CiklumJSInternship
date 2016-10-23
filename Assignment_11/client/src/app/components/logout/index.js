import angular from 'angular';

import LogoutComponent from './logout.component';

const logout = angular
  .module('logout', [])
  .component('logout', LogoutComponent)
  .name;

export default logout;
