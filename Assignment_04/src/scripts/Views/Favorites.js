/* global document: true */
import { unpinFromFavorites } from '../actions';

function Favorites(id, store) {
  this.rootElement = document.getElementById(id);
  this.store = store;
  this.render();
  this.rootElement.addEventListener('click', (e) => {
    e.stopPropagation();
    const fromFavoriteId = e.target.dataset.fromFavoriteId;
    if (fromFavoriteId !== undefined) {
      this.store.dispatch(unpinFromFavorites(fromFavoriteId));
    }
  });
}

Favorites.prototype.render = function render() {
  const state = this.store.getState();
  this.rootElement.innerHTML = '';
  if (state.favorites.length > 0) {
    // Display favorites
    for (let i = 0; i < state.favorites.length; i += 1) {
      this.rootElement.insertAdjacentHTML('beforeend',
        `<tr>
         <td>${i + 1}</td>
         <td class="mdl-data-table__cell--non-numeric" title="${state.favorites[i].Title}">
           ${state.favorites[i].Title}
         </td>
         <td class="mdl-data-table__cell--non-numeric">${state.favorites[i].Type}</td>
         <td class="mdl-data-table__cell--non-numeric">${state.favorites[i].Year}</td>
         <td class="mdl-data-table__cell--non-numeric">
           <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
             data-from-favorite-id="${state.favorites[i].imdbID}"
             title="Remove from favorites"
           >
             <i class="material-icons" data-from-favorite-id="${state.favorites[i].imdbID}">
               favorite
             </i>
           </button>
         </td>
       </tr>`
      );
    }
  }
};

export default Favorites;
