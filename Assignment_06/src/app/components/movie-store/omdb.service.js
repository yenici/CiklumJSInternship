import { isNumber, fromJson } from 'angular';

class OmdbService {
  constructor($httpParamSerializer, $http, $q, config) {
    this.$httpParamSerializer = $httpParamSerializer;
    this.$http = $http;
    this.$q = $q;
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
          return json;
        }
        return null;
      }, () => null); // TODO: Error handling
  }
}

OmdbService.$inject = ['$httpParamSerializer', '$http', '$q', 'config'];

export default OmdbService;
