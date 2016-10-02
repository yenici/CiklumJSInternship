class OmdbMoviesController {
  constructor(OmdbService) {
    this.omdbService = OmdbService;
    this.foundMovies = [];
    this.workingMovies = [];
  }
  // $onInit() {}
  $onChanges(changes) {
    if (changes.favoriteMovies) {
      this.favoriteMovies = changes.favoriteMovies.currentValue;
      this.workingMovies = this.getMoviesWithoutFavorites();
    }
    if (changes.foundMovies) {
      this.foundMovies = changes.foundMovies.currentValue;
      this.workingMovies = this.getMoviesWithoutFavorites();
    }
  }
  getMoviesWithoutFavorites() {
    return this.foundMovies.filter(
      movie => this.favoriteMovies
        .find(favorite => favorite.imdbID === movie.imdbID) === undefined);
  }
  unpinFavoriteMovie({ imdbID }) {
    this.favoriteMovies = this.omdbService.unpinFromFavorites(imdbID);
    this.workingMovies = this.getMoviesWithoutFavorites();
  }
  pinMovieToFavorites({ movie }) {
    this.favoriteMovies = this.omdbService.pinToFavorites(movie);
    this.workingMovies = this.getMoviesWithoutFavorites();
  }
}

OmdbMoviesController.$inject = ['OmdbService'];

export default OmdbMoviesController;
