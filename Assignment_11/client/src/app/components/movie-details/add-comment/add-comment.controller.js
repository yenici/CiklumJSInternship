class AddCommentController {
  constructor($rootScope) {
    this.$rootScope = $rootScope;
    this.comment = '';
  }

  // $onInit() {}

  // $onChanges(changes) {}

  submitAddComment(comment) {
    if (comment.trim().length < 3) {
      return;
    }
    this.onAddComment({
      $event: {
        comment,
      },
    });
    this.comment = '';
  }
}

AddCommentController.$inject = ['$rootScope'];

export default AddCommentController;
