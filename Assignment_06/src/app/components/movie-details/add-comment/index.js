import angular from 'angular';

import AddCommentComponent from './add-comment.component';

const addcomment = angular
  .module('addcomment', [])
  .component('addcomment', AddCommentComponent)
  .name;

export default addcomment;
