import { isNumber, fromJson, toJson } from 'angular';

class OmdbService {

  constructor($httpParamSerializer, $http, $rootScope, $window, config) {
    this.$httpParamSerializer = $httpParamSerializer;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.$window = $window;
    this.config = config;
  }

  login(username, password) {
    const url = this.config.apiUrl.concat('/authenticate');
    return this.$http
      .post(url,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(
        response => fromJson(response.data),
        err => ({ success: false, message: err.toString()})
      );
  }

  signin(username, password) {
    const url = this.config.apiUrl.concat('/signin');
    return this.$http
      .post(url,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(
        response => fromJson(response.data),
        err => ({ success: false, message: err.toString()})
      );
  }

  getFavorites() {
    if (this.$rootScope.token) {
      const url = this.config.apiUrl.concat(`/favorites`);
      // this.$http.defaults.headers.common.Authorization = this.$rootScope.token;
      return this.$http.get(
        url,
        { headers: { 'Authorization': this.$rootScope.token } }
      )
        .then((response) => {
          const resObj = fromJson(response.data);
          if (resObj.success) {
            return resObj.data;
          } else {
            console.error(resObj.message);
            return [];
          }
        }, (err) => {
          console.error(err);
          return [];
        });
    } else {
      return [];
    }
  }

  pinToFavorites(movie) {
    const url = this.config.apiUrl.concat('/favorites');
    return this.$http
      .post(url,
        { movie },
        { headers: { 'Authorization': this.$rootScope.token, 'Content-Type': 'application/json' } }
      )
      .then(
        response => fromJson(response.data),
        err => ({ success: false, message: err.toString()})
      );
  }

  unpinFromFavorites(imdbID) {
    const url = this.config.apiUrl.concat(`/favorites/${imdbID}`);
    return this.$http
      .post(url,
        {},
        { headers: { 'Authorization': this.$rootScope.token, 'Content-Type': 'application/json' } }
      )
      .then(
        response => fromJson(response.data),
        err => ({ success: false, message: err.toString()})
      );
  }

  searchMovie(title) {
    const url = this.config.apiUrl.concat(`/search/${title.trim()}`);
    return this.$http.get(url)
      .then((response) => {
        const resObj = fromJson(response.data);
        if(resObj.success) {
          return resObj.data;
        } else {
          console.error(resObj.message);
          return [];
        }
      }, (err) => {
        console.error(err);
        return [];
      });
  }

  getMovieDetails(imdbID) {
    const url = this.config.apiUrl.concat(`/movie/${imdbID.trim()}`);
    return this.$http.get(url)
      .then((response) => {
        const resObj = fromJson(response.data);
        if (resObj.success) {
          return resObj.data;
        } else {
          console.error(resObj.message);
          return {};
        }
      }, (err) => console.error(err)); // TODO: Error handling
  }

  addMovieComment(imdbID, comment) {
    const url = this.config.apiUrl.concat(`/movie/${imdbID.trim()}/comment`);
    return this.$http
      .post(url,
        { comment },
        { headers: { 'Authorization': this.$rootScope.token, 'Content-Type': 'application/json' } }
      )
      .then(
        (response) => {
          const resObj = fromJson(response.data);
          if (resObj.success) {
            return resObj.data;
          } else {
            console.error(resObj.message);
            return {};
          }
        },
        (err) => {
          console.error(err);
          return null;
        }
      );
  }
}

OmdbService.$inject = ['$httpParamSerializer', '$http', '$rootScope', '$window', 'config'];

export default OmdbService;
