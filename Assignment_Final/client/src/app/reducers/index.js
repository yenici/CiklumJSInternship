import { combineReducers } from 'redux';

import globalReducer from './globalReducer';
import spacePlannerReducer from './spacePlannerReducer';

const Reducers = combineReducers({
  globalState: globalReducer,
  spacePlanner: spacePlannerReducer,
});

export default Reducers;
