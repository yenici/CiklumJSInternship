const visibilityFilter = (state = 'All', action) => {
  let newState;
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      newState = action.filter;
      break;
    default:
      newState = state;
  }
  return newState;
};

export default visibilityFilter;
