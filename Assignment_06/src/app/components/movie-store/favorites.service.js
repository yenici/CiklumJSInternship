/* global localStorage: true */
import { fromJson, toJson } from 'angular';

class FavoritesService {
  constructor($window) {
    this.$window = $window;
  }
  getFavorites() {
    const favoritesJson = this.$window.localStorage.getItem('omdbFavorites');
    if (favoritesJson !== null) {
      return fromJson(favoritesJson);
    }
    return [];
  }
  pinToFavorites(movieToPin) {
    const favorites = this.getFavorites();
    if (favorites.find(movie => movie.imdbID === movieToPin.imdbID) === undefined) {
      const newFavorites = favorites.concat([movieToPin]);
      try {
        this.$window.localStorage.setItem('omdbFavorites', toJson(newFavorites));
        return newFavorites;
      } catch (e) {
        // TODO: Show error
        console.error(e);
      }
      // TODO: Show error
      return favorites;
    }
    // The movie is already in favorites.
    return favorites;
  }
  unpinFromFavorites(imdbID) {
    const favorites = this.getFavorites();
    const newFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
    if (newFavorites.length < favorites.length) {
      try {
        this.$window.localStorage.setItem('omdbFavorites', toJson(newFavorites));
        return newFavorites;
      } catch (e) {
        // TODO: Show error
        console.error(e);
      }
      return favorites;
    }
    // There's no such movie in favorites
    return favorites;
  }
}

FavoritesService.$inject = ['$window'];

export default FavoritesService;
