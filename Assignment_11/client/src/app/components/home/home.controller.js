class HomeController {
  constructor(OmdbService, $state) {
    this.omdbService = OmdbService;
    this.$state = $state;
    this.active = false;
  }
  $onInit() {
    this.query = '';
    this.active = false;
  }
  $onChanges(changes) {
    if (changes.favoriteMovies) {
      this.favoriteMovies = changes.favoriteMovies.currentValue;
    }
  }
  searchMovie({ query }) {
    // You can't pass object through an ui-router parameter
    // http://stackoverflow.com/questions/36341198/how-to-pass-array-to-angularjs-app-via-url-using-ui-router-module
    this.active = true; // Show spinner
    this.query = query;
    this.$state.go('search', { query: this.query, favoriteMovies: this.favoriteMovies });
  }
  unpinFavoriteMovie({ imdbID }) {
    this.omdbService.unpinFromFavorites(imdbID)
      .then(res => {
        if (res.success) {
          this.favoriteMovies = this.favoriteMovies.filter(movie => movie.imdbID !== imdbID);
        } else {
          console.error(res.message);
        }
      });
  }
}

HomeController.$inject = ['OmdbService', '$state'];

export default HomeController;
