class SpinnerController {
  $onChanges(changes) {
    if (changes.active) {
      this.active = changes.active.currentValue;
    }
  }
}

export default SpinnerController;
