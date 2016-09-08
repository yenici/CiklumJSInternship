import booksData from '../data/issues.json';

const bookShelf = (state = booksData.books, action) => state;

export default bookShelf;
