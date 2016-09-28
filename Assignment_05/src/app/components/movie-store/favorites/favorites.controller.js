class FavoritesController {
  $onChanges(changes) {
    if (changes.favoriteMovies) {
      // Create a copy of a Favorites.
      // IMHO this is not a good idea: I do not change favorites in the component.
      this.favoriteMovies = [].concat(changes.favoriteMovies.currentValue);
    }
  }
  $onInit() {
  }
  unpinMovie(imdbID) {
    this.onUnpinMovie({
      $event: {
        imdbID,
      },
    });
  }
}

export default FavoritesController;
