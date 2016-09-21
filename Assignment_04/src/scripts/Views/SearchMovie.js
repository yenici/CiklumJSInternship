/* global document: true */

import { fetchMovies } from '../actions';

function SearchMovie(id, store) {
  this.rootElement = document.getElementById(id);
  this.store = store;
  this.rootElement.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const query = document.getElementById('q').value;
    this.store.dispatch(fetchMovies(query));
  });
}

export default SearchMovie;
