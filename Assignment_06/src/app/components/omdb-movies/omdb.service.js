import { isNumber, fromJson, toJson } from 'angular';

class OmdbService {
  constructor($httpParamSerializer, $http, $q, $window, config) {
    this.$httpParamSerializer = $httpParamSerializer;
    this.$http = $http;
    this.$q = $q;
    this.$window = $window;
    this.config = config;
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
      const newFavorites = [...favorites, movieToPin];
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
  getMoviePage(title, page = 1) {
    const url = this.config.omdbUrl.concat(
      this.$httpParamSerializer({
        s: title.trim(),
        page: isNumber(page) ? page.toString() : 1,
      })
    );
    return this.$http.get(url)
      .then((response) => {
        const json = fromJson(response.data);
        if (json.Response === 'True') {
          return {
            count: Number(json.totalResults),
            movies: json.Search,
          };
        }
        return {
          count: 0,
          movies: [],
        };
      }, () => ({ count: 0, movies: [] })); // TODO: Error handling
  }
  searchMovie(title) {
    return this.getMoviePage(title, 1)
      .then((firstPage) => {
        if (firstPage.count > this.config.omdbRespMovOnPage) {
          const pageCnt =
            Math.ceil(firstPage.count / this.config.omdbRespMovOnPage);
          return this.$q.all(
            [...Array(pageCnt - 1).keys()] // We've already got the 1st page
              .map(no => this.getMoviePage(title, no + 2))) // Starts from the 2nd page
            .then(pages => pages.reduce(
              (r, page) => r.concat(page.movies),
              firstPage.movies));
        }
        return firstPage.movies;
      });
  }
  getAllComments() {
    const commentsJson = this.$window.localStorage.getItem('omdbComments');
    if (commentsJson !== null) {
      return fromJson(commentsJson);
    }
    return Object.create({});
  }
  addMovieComment(imdbID, author, comment) {
    const newComment = {
      date: new Date(),
      author,
      comment,
    };
    const allComments = this.getAllComments(); // An Object of all movies with comments
    if (allComments[imdbID] === undefined) {
      allComments[imdbID] = Array.of(newComment);
    } else {
      allComments[imdbID] = [...allComments[imdbID], newComment];
    }
    try {
      this.$window.localStorage.setItem('omdbComments', toJson(allComments));
    } catch (e) {
      // TODO: Show error
      console.error(e);
    }
  }
  getMovieComments(imdbID) {
    const allComments = this.getAllComments();
    const comments = allComments[imdbID];
    if (comments !== undefined) {
      return comments;
    }
    return [];
  }
  getMovieDetails(imdbID) {
    const url = this.config.omdbUrl.concat(
      this.$httpParamSerializer({
        i: imdbID.trim(),
        plot: 'full',
        r: 'json',
        tomatoes: 'true',
        v: 1,
      })
    );
    return this.$http.get(url)
      .then((response) => {
        const json = fromJson(response.data);
        if (json.Response === 'True') {
          json.Comments = this.getMovieComments(imdbID);
          return json;
        }
        return null;
      }, () => null); // TODO: Error handling
  }
}

OmdbService.$inject = ['$httpParamSerializer', '$http', '$q', '$window', 'config'];

export default OmdbService;
