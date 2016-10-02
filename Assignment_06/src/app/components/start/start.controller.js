class StartController {
  constructor(OmdbService, $state) {
    this.omdbService = OmdbService;
    this.$state = $state;
    this.active = false;
  }
  $onInit() {
    this.favoriteMovies = this.omdbService.getFavorites();
    this.query = '';
    this.active = false;
  }
  // $onChanges(changes) {}
  searchMovie({ query }) {
    // You can't pass object through an ui-router parameter
    // http://stackoverflow.com/questions/36341198/how-to-pass-array-to-angularjs-app-via-url-using-ui-router-module
    this.active = true; // Show spinner
    this.query = query;
    this.$state.go('search', { query: this.query, favoriteMovies: this.favoriteMovies });
  }
  unpinFavoriteMovie({ imdbID }) {
    this.favoriteMovies = this.omdbService.unpinFromFavorites(imdbID);
  }
}

StartController.$inject = ['OmdbService', '$state'];

export default StartController;
