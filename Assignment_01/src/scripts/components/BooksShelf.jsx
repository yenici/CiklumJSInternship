import React, { PropTypes } from 'react';
import BooksItem from './BooksItem.jsx';

function BooksShelf({ books }) {
  return (
    <div className="BooksShelf">
      {books.map((book, index) => <BooksItem key={index} book={book} />)}
    </div>
  );
}

BooksShelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    authorUrl: PropTypes.string.isRequired,
    level: PropTypes.oneOf(['All', 'Beginner', 'Intermediate', 'Advanced']).isRequired,
    info: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  })),
};

BooksShelf.defaultProps = {
  books: [],
};

export default BooksShelf;
