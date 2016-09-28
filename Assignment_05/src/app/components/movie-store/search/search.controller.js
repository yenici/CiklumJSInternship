class SearchController {
  $onInit() {
    this.query = ''.concat(this.query);
  }
  // $onChanges(changes) {
  // }
  onSubmit() {
    if (this.query.trim().length > 0) {
      this.onSearchSubmit({
        $event: {
          query: this.query,
        },
      });
    }
  }
}

export default SearchController;
