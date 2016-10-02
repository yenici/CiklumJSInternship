import angular from 'angular';

import MovieBriefComponent from './movie-brief.component';

const moviebrief = angular
  .module('moviebrief', [])
  .component('moviebrief', MovieBriefComponent)
  .name;

export default moviebrief;
