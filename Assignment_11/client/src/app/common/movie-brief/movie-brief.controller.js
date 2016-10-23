class MovieBriefController {
  constructor($rootScope) {
    this.$rootScope = $rootScope;
  }

  $onInit() {}

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

MovieBriefController.$inject = ['$rootScope'];

export default MovieBriefController;
