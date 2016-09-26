export default class OmdbCtrl {
  constructor(favoritesService, omdbService) {
    this.omdbService = omdbService;
    this.favoritesService = favoritesService;
    this.favorites = this.favoritesService.getFavorites();
    this.searchResult = []
    this.movies = this.searchResult;
    this.queryInProgress = false;
    this.query = '';
    this.movieTypes = ['movie', 'series', 'episode', 'game'];
    this.filterExpr = '';
    this.orderExpr = 'Title';
    this.orderDesc = false;
  }
  static getMoviesWithoutFav(m, f) {
    return m.filter(
      movie => f.find(favorite => favorite.imdbID === movie.imdbID) === undefined);
  }
  pinMovie(imdbID) {
    const movieToPin = this.movies.find(movie => movie.imdbID === imdbID);
    if (movieToPin !== undefined) {
      this.favorites = this.favoritesService.pinToFavorites(movieToPin);
      this.movies = OmdbCtrl.getMoviesWithoutFav(this.searchResult, this.favorites);
    }
    // TODO: Unexpected error
  }
  unpinMovie(imdbID) {
    this.favorites = this.favoritesService.unpinFromFavorites(imdbID);
    this.movies = OmdbCtrl.getMoviesWithoutFav(this.searchResult, this.favorites);
  }
  searchMovie() {
    this.query = this.query ? this.query.trim() : '';
    this.searchResult = [];
    this.movies = this.searchResult;
    this.queryInProgress = true;
    this.omdbService.searchMovie(this.query).then((movies) => {
      console.info(movies);
      this.queryInProgress = false;
      this.searchResult = movies;
      this.movies = OmdbCtrl.getMoviesWithoutFav(this.searchResult, this.favorites);
    });
  }
  setOrder(order) {
    if (this.movies.length > 0) {
      this.orderDesc = (this.orderExpr === order) ? !this.orderDesc : false;
      this.orderExpr = order;
    }
  }
  setFilter(filter) {
    this.filterExpr = filter;
  }
}
