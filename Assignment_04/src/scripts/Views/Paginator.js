/* global document: true */

import { moveToPage } from '../Actions/actions';

function Paginator(id, store) {
  this.rootElement = document.getElementById(id);
  this.prevButton = this.rootElement.getElementsByTagName('button').item(0);
  this.nextButton = this.rootElement.getElementsByTagName('button').item(1);
  this.pageInfo = this.rootElement.getElementsByTagName('span').item(0);
  this.store = store;
  this.prevButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const nextPage = this.store.getState().paginator.currentPage - 1;
    this.store.dispatch(moveToPage(nextPage));
  });
  this.nextButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const nextPage = this.store.getState().paginator.currentPage + 1;
    this.store.dispatch(moveToPage(nextPage));
  });
  this.render();
}

Paginator.prototype.render = function render() {
  const state = this.store.getState();
  this.prevButton.disabled = state.paginator.currentPage <= 1;
  this.nextButton.disabled = state.paginator.currentPage >= state.paginator.totalPages;
  this.pageInfo.innerHTML = `Page ${state.paginator.currentPage} of ${state.paginator.totalPages}`;
};

export default Paginator;
