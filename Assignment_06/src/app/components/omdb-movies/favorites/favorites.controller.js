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
  unpinMovie({ movie }) {
    console.info('favorites unpin');
    console.info(movie);
    this.onUnpinMovie({
      $event: {
        imdbID: movie.imdbID,
      },
    });
  }
}

export default FavoritesController;
