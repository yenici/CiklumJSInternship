import controller from './search.controller';
import template from './search.html';

const SearchComponent = {
  bindings: {
    query: '<',
    searchInProgress: '<',
    onSearchSubmit: '&',
  },
  controller,
  template,
};

export default SearchComponent;
