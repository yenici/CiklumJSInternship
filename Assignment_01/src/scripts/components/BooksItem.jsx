import React, { PropTypes } from 'react';

function BooksItem({ book }) {
  const coverBackgroundImg = { backgroundImage: `url(${book.cover})` };
  return (
    <div className="BooksItem">
      <a
        className="BooksItem__cover"
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
        style={coverBackgroundImg}
      />
      <div className="BooksItem__description">
        <a
          className="BooksItem__title"
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
          title={book.title}
        >
          {book.title}
        </a>
        <a
          className="BooksItem__author"
          href={book.authorUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {book.author}
        </a>
        <p className="BooksItem__level">{book.level}</p>
        <p className="BooksItem__info">{book.info}</p>
      </div>
    </div>
  );
}

BooksItem.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    authorUrl: PropTypes.string.isRequired,
    level: PropTypes.oneOf(['All', 'Beginner', 'Intermediate', 'Advanced']).isRequired,
    info: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }),
};

export default BooksItem;
