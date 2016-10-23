class MovieFilterController {
  $onInit() {
    this.filterTypes = this.parentComp.filterTypes;
    this.filterExpr = this.parentComp.filterExpr;
  }
  $onChanges(changes) {
    if (changes.filterTypes) {
      this.filterTypes = changes.filterTypes.currentValue;
    }
    if (changes.filterExpr1) {
      this.filterExpr = changes.filterExpr.currentValue;
    }
  }
  onFilterClick(filter) {
    this.onFilterSet({
      $event: {
        filter,
      },
    });
  }
}

export default MovieFilterController;
