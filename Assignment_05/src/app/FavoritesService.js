/* global localStorage: true */
import { fromJson, toJson } from 'angular';

const FavoritesService = function FavoritesService($window) {
  return {
    getFavorites() {
      const favoritesJson = $window.localStorage.getItem('omdbFavorites');
      if (favoritesJson !== null) {
        return fromJson(favoritesJson);
      }
      return [];
    },
    pinToFavorites(movieToPin) {
      const favorites = this.getFavorites();
      if (favorites.find(movie => movie.imdbID === movieToPin.imdbID) === undefined) {
        const newFavorites = favorites.concat([movieToPin]);
        try {
          $window.localStorage.setItem('omdbFavorites', toJson(newFavorites));
          return newFavorites;
        } catch (e) {
          console.error(e);
        }
        return favorites;
      }
      // The movie is already in favorites.
      return favorites;
    },
    unpinFromFavorites(imdbID) {
      const favorites = this.getFavorites();
      const newFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
      if (newFavorites.length < favorites.length) {
        try {
          $window.localStorage.setItem('omdbFavorites', toJson(newFavorites));
          return newFavorites;
        } catch (e) {
          console.error(e);
        }
        return favorites;
      }
      // There's no such movie in favorites
      return favorites;
    },
  };
};

export default FavoritesService;
