class MovieSortController {
  $onInit() {
    this.orderExpr = this.parentComp.orderExpr;
    this.orderDesc = this.parentComp.orderDesc;
  }
  $onChanges(changes) {
    if (changes.orderExpr) {
      this.orderExpr = changes.orderExpr.currentValue;
    }
    if (changes.orderDesc) {
      this.orderDesc = changes.orderDesc.currentValue;
    }
  }
  onOrderClick(order) {
    this.onOrderSet({
      $event: {
        order,
      },
    });
  }
}

export default MovieSortController;
