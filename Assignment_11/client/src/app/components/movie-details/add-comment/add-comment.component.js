import controller from './add-comment.controller';
import template from './add-comment.html';

const AddCommentComponent = {
  bindings: {
    onAddComment: '&',
  },
  controller,
  template,
};

export default AddCommentComponent;
