const searchFilter = (state = '', action) => {
  let newState;
  switch (action.type) {
    case 'SET_SEARCH_FILTER':
      newState = action.query.trim();
      break;
    default:
      newState = state;
  }
  return newState;
};

export default searchFilter;
