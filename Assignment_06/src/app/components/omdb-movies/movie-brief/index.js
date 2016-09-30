import angular from 'angular';

import MovieBriefComponent from './movie-brief.component';

const search = angular
  .module('moviebrief', [])
  .component('moviebrief', MovieBriefComponent)
  .name;

export default search;
