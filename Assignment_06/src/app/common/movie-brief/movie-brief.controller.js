class MovieBriefController {
  $onInit() {
  }
  $onChanges(changes) {
    if (changes.movie) {
      this.movie = changes.movie.currentValue;
    }
  }
  onPinUnpin(movie) {
    this.onPinUnpinMovie({
      $event: {
        movie,
      },
    });
  }
}

export default MovieBriefController;
