/* global document: true */

function Spinner(id, store) {
  this.rootElement = document.getElementById(id);
  this.store = store;
  this.render();
}

Spinner.prototype.render = function render() {
  const state = this.store.getState();
  if (state.isFetching) {
    this.rootElement.style.display = 'block';
  } else {
    this.rootElement.style.display = 'none';
  }
};

export default Spinner;
