import { connect } from 'react-redux';
import BooksShelf from '../components/BooksShelf.jsx';

const getVisibleBooks = (books, query, filter) => {
  let searchedBooks;
  if (query === '') {
    // We have no search filter
    searchedBooks = books;
  } else {
    // We have a search filter
    const queryString = query.toUpperCase();
    searchedBooks = books.filter(book => (book.title.toUpperCase().indexOf(queryString) >= 0) ||
        (book.author.toUpperCase().indexOf(queryString) >= 0) ||
        (book.info.toUpperCase().indexOf(queryString) >= 0)
    );
  }
  if (filter === 'All') {
    return searchedBooks;
  }
  return searchedBooks.filter(book => book.level === filter);
};

const mapStateToProps = (state) => (
  { books: getVisibleBooks(state.bookShelf, state.searchFilter, state.visibilityFilter) }
);

// const mapDispatchToProps = dispatch => (
//     { onFilterClick: id => dispatch(toggleTodo(id)) }
// );

const BooksVisibleShelf = connect(
    mapStateToProps
    // mapDispatchToProps
)(BooksShelf);

export default BooksVisibleShelf;
