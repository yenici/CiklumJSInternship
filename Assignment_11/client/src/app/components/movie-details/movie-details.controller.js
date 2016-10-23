import angular from 'angular';

class MovieDetailsController {
  constructor(OmdbService, $state) {
    this.omdbService = OmdbService;
    this.$state = $state;
    if (this.previousState.URL === null) {
      this.previousState.Name = 'start';
      this.previousState.Params = { '#': null };
      this.previousState.URL = '#/';
    }
  }
  // $onInit() {}
  $onChanges(changes) {
    function parseStars(rate) {
      if (!Number.isNaN(rate)) {
        return (((rate - (rate % 2))) / 2) + (Math.round(rate % 2) / 2);
      }
      return 0;
    }
    if (changes.movie) {
      this.movie = Object.assign({}, changes.movie.currentValue);
      this.movie.Comments = [...this.movie.Comments];
      this.movie.Stars = parseStars(this.movie.imdbRating);
    }
    if (changes.previousState) {
      if (changes.previousState.currentValue !== this.previousState) {
        angular.copy(changes.previousState.currentValue, this.previousState);
      }
      if (this.previousState.URL === null) {
        this.previousState.Name = 'start';
        this.previousState.Params = { '#': null };
        this.previousState.URL = '#/';
      }
    }
  }
  goBack() {
    // TODO: It doesn't work!
    // console.info(this.previousState.URL);
    // this.$state.go(this.previousState.URL);
  }
  addComment({ comment }) {
    this.omdbService
      .addMovieComment(this.movie.imdbID, comment)
      .then(movie => this.movie.Comments = movie ? movie.Comments : this.movie.Comments)
      .catch(err => console.error(err));
  }
}

MovieDetailsController.$inject = ['OmdbService', '$state'];

export default MovieDetailsController;
