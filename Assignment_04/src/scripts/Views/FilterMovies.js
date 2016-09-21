/* global document: true */

import { MovieTypeFilter, filterMovies } from '../Actions/actions';

function FilterMovies(id, store) {
  this.rootElement = document.getElementById(id);
  this.store = store;
  this.rootElement.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.tagName === 'A') {
      this.store.dispatch(filterMovies(e.target.innerHTML));
    }
  });
  this.render();
}

FilterMovies.prototype.render = function render() {
  const state = this.store.getState();
  this.rootElement.innerHTML = '';
  Object.keys(MovieTypeFilter).forEach((key) => {
    if (MovieTypeFilter[key] === state.filter) {
      this.rootElement.insertAdjacentHTML('beforeend',
        `<li class="mdl-logo">${MovieTypeFilter[key]}</li>`
      );
    } else {
      this.rootElement.insertAdjacentHTML('beforeend',
        `<li><a href="#">${MovieTypeFilter[key]}</a></li>`
      );
    }
  });
};

export default FilterMovies;
