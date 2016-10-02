class AddCommentController {
  constructor() {
    this.comment = { author: '', text: '' };
  }
  // $onInit() {}
  // $onChanges(changes) {}
  submitAddComment(comment) {
    if (comment.author.trim().length < 5) {
      return;
    }
    if (comment.text.trim().length < 3) {
      return;
    }
    this.onAddComment({
      $event: {
        comment,
      },
    });
    this.comment = { author: '', text: '' };
  }
}

export default AddCommentController;
