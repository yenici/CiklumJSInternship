class MovieBriefController {
  $onInit() {
  }
  $onChanges(changes) {
    if (changes.movie) {
      this.movie = changes.movie.currentValue;
    }
  }
  onPinUnpin(movie) {
    console.info('movie-brief unpin');
    console.info(movie);
    this.onPinUnpinMovie({
      $event: {
        movie,
      },
    });
  }
}

export default MovieBriefController;
