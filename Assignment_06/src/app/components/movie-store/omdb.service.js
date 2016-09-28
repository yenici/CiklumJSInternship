import { isNumber, fromJson, toJson } from 'angular';

class OmdbService {
  constructor($httpParamSerializer, $http, $q, $window, config) {
    this.$httpParamSerializer = $httpParamSerializer;
    this.$http = $http;
    this.$q = $q;
    this.$window = $window;
    this.config = config;
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
    return {};
  }
  addMovieComment(imdbID, author, comment) {
    const newComment = {
      author,
      comment,
    };
    const allComments = this.getAllComments();
    if (allComments[imdbID] === undefined) {
      allComments[imdbID] = [newComment];
    } else {
      allComments[imdbID] = allComments[imdbID].push(newComment);
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
