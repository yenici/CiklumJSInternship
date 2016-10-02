import angular from 'angular';

import SpinnerComponent from './spinner.component';

const spinner = angular
  .module('spinner', [])
  .component('spinner', SpinnerComponent)
  .name;

export default spinner;
