class MovieDetailsController {
  constructor() {
    console.info('MovieDetails Constructor');
  }
  $onInit() {
  }
  $onChanges(changes) {
    function parseStars(rate) {
      if (!Number.isNaN(rate)) {
        return (((rate - (rate % 2))) / 2) + (Math.round(rate % 2) / 2);
      }
      return 0;
    }
    if (changes.movie) {
      this.movie = changes.movie.currentValue;
      this.movie.Stars = parseStars(this.movie.imdbRating);
    }
  }
}

// MovieDetailsController.$inject = ['OmdbService'];

export default MovieDetailsController;
