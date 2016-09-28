class MovieStoreController {
  constructor(FavoritesService, SearchService) {
    this.favoritesService = FavoritesService;
    this.searchService = SearchService;
    this.searchInProgress = false;
    this.favoriteMovies = [];
    this.query = '';
    this.foundMovies = [];
    this.workingMovies = [];
  }
  $onInit() {
    this.favoriteMovies = this.favoritesService.getFavorites();
  }
  $onChanges(changes) {
  }
  searchMovie(title) {
    this.query = title.query;
    this.searchInProgress = true;
    this.searchService.searchMovie(this.query).then((movies) => {
      this.foundMovies = movies;
      this.workingMovies = this.getMoviesWithoutFavorites();
      this.searchInProgress = false;
    });
  }
  getMoviesWithoutFavorites() {
    return this.foundMovies.filter(
      movie => this.favoriteMovies
        .find(favorite => favorite.imdbID === movie.imdbID) === undefined);
  }
  unpinFavoriteMovie({ imdbID }) {
    this.favoriteMovies = this.favoritesService.unpinFromFavorites(imdbID);
    this.workingMovies = this.getMoviesWithoutFavorites();
  }
  pinMovieToFavorites({ movie }) {
    this.favoriteMovies = this.favoritesService.pinToFavorites(movie);
    this.workingMovies = this.getMoviesWithoutFavorites();
  }
}

MovieStoreController.$inject = ['FavoritesService', 'SearchService'];

export default MovieStoreController;
