/* global document: true */
import { pinToFavorites, sortMovies } from '../Actions/actions';

function MoviesTable(id, store) {
  this.rootElement = document.getElementById(id);
  this.tableBody = this.rootElement.getElementsByTagName('tbody').item(0);
  this.store = store;
  this.render();
  this.rootElement.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const toFavoriteId = e.target.dataset.addFavoriteId;
    if (toFavoriteId !== undefined) {
      this.store.dispatch(pinToFavorites(toFavoriteId));
    } else {
      const order = e.target.dataset.sortBy;
      if (order !== undefined) {
        this.store.dispatch(sortMovies(order));
      }
    }
  });
}

MoviesTable.prototype.render = function render() {
  const state = this.store.getState();
  const headerColumns = this.rootElement.querySelectorAll('th');
  for (let i = 0; i < headerColumns.length; i += 1) {
    const headerCol = headerColumns.item(i);
    if (headerCol.firstElementChild !== null) {
      const link = headerCol.firstElementChild;
      if (link.dataset.sortBy === state.order.name) {
        if (state.order.ascending) {
          headerCol.classList.add('mdl-data-table__header--sorted-ascending');
          headerCol.classList.remove('mdl-data-table__header--sorted-descending');
        } else {
          headerCol.classList.remove('mdl-data-table__header--sorted-ascending');
          headerCol.classList.add('mdl-data-table__header--sorted-descending');
        }
      } else {
        headerCol.classList.remove('mdl-data-table__header--sorted-ascending');
        headerCol.classList.remove('mdl-data-table__header--sorted-descending');
      }
    }
  }
  this.tableBody.innerHTML = '';
  if (state.movies.length > 0) {
    // Display search results
    const startIndex = (state.paginator.currentPage - 1) * state.paginator.onPage;
    const endIndex = Math.min(state.movies.length, startIndex + state.paginator.onPage);
    for (let i = startIndex; i < endIndex; i += 1) {
      this.tableBody.insertAdjacentHTML('beforeend',
        `<tr>
         <td>${i + 1}</td>
         <td class="mdl-data-table__cell--non-numeric" title="${state.movies[i].Title}">
           ${state.movies[i].Title}
         </td>
         <td class="mdl-data-table__cell--non-numeric">${state.movies[i].Type}</td>
         <td class="mdl-data-table__cell--non-numeric">${state.movies[i].Year}</td>
         <td class="mdl-data-table__cell--non-numeric">
           <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
             id="${state.movies[i].imdbID}"
             data-add-favorite-id="${state.movies[i].imdbID}"
             title="Add to favorites"
           >
             <i class="material-icons" data-add-favorite-id="${state.movies[i].imdbID}">
               favorite_border
             </i>
           </button>
         </td>
       </tr>`
      );
    }
  }
};

export default MoviesTable;
