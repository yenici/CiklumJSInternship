class FavoritesController {
  $onInit() {}
  $onChanges(changes) {
    if (changes.favoriteMovies) {
      // Create a copy of a Favorites.
      // IMHO this is not a good idea: I do not change favorites in the component.
      this.favoriteMovies = [].concat(changes.favoriteMovies.currentValue);
    }
  }
  unpinMovie({ movie }) {
    this.onUnpinMovie({
      $event: {
        imdbID: movie.imdbID,
      },
    });
  }
}

export default FavoritesController;
