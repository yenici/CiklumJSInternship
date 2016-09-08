import { combineReducers } from 'redux';
import bookShelf from './bookShelf';
import visibilityFilter from './visibilityFilter';
import searchFilter from './searchFilter';

const booksAppReducers = combineReducers({
  bookShelf,
  visibilityFilter,
  searchFilter,
});

export default booksAppReducers;
