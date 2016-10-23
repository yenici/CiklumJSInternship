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
    this.foundMovies.map((movie, index) => {
      if (movie === null) {
        console.log(index);
      }
    });
    return this.foundMovies.filter(
      movie => {
        return this.favoriteMovies
          .find(favorite => favorite.imdbID === movie.imdbID) === undefined;
      });
  }
  unpinFavoriteMovie({ imdbID }) {
    this.omdbService.unpinFromFavorites(imdbID)
      .then(res => {
        if (res.success) {
          this.favoriteMovies = this.favoriteMovies.filter(movie => movie.imdbID !== imdbID);
          this.workingMovies = this.getMoviesWithoutFavorites();
        } else {
          console.error(res.message);
        }
      });
  }
  pinMovieToFavorites({ movie }) {
    this.omdbService.pinToFavorites(movie)
      .then(res => {
        if (res.success) {
          this.favoriteMovies = this.favoriteMovies.concat(movie);
          this.workingMovies = this.getMoviesWithoutFavorites();
        } else {
          console.error(res.message);
        }
      });
  }
}

OmdbMoviesController.$inject = ['OmdbService'];

export default OmdbMoviesController;
