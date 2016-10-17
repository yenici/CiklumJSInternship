import React from 'react';
import Remarkable from 'remarkable';

const Comment = function Comment({ author, children }) {
  const rawMarkup = () => {
    const md = new Remarkable();
    var rawMarkup = md.render(children.toString());
    return { __html: rawMarkup };
  };
  return (
    <div>
      <h3 style={{ marginBottom: '6px', color: '#777', fontStyle: 'italic' }}>{author}</h3>
      <span dangerouslySetInnerHTML={rawMarkup()} />
    </div>
  );
};

export default Comment;