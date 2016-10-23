import angular from 'angular';

import MovieDetailsComponent from './movie-details.component';
import AddCommentComponent from './add-comment';

const moviedetails = angular
  .module('moviedetails', [AddCommentComponent])
  .component('moviedetails', MovieDetailsComponent)
  .name;

export default moviedetails;
