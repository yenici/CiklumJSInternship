export const setVisibilityFilter = filter => (
  {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  }
);

export const setSearchFilter = query => (
  {
    type: 'SET_SEARCH_FILTER',
    query,
  }
);
