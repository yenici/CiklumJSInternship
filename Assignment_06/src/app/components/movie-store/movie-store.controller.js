class MovieStoreController {
  constructor(FavoritesService, OmdbService) {
    this.favoritesService = FavoritesService;
    this.omdbService = OmdbService;
    this.searchInProgress = false;
    this.favoriteMovies = [];
    this.query = '';
    this.foundMovies = [];
    this.workingMovies = [];
  }
  $onInit() {
    this.favoriteMovies = this.favoritesService.getFavorites();
    // this.omdbService.getMovieDetails('tt0325980').then(e => console.info(e));
  }
  $onChanges(changes) {
  }
  searchMovie(title) {
    this.query = title.query;
    this.searchInProgress = true;
    this.omdbService.searchMovie(this.query).then((movies) => {
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

MovieStoreController.$inject = ['FavoritesService', 'OmdbService'];

export default MovieStoreController;
