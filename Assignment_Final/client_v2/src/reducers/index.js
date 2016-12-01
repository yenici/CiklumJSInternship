import { combineReducers } from 'redux';

import floorPlanReducer from './floorPlanReducer';
// import globalReducer from './globalReducer';
// import spacePlannerReducer from './spacePlannerReducer';

const Reducers = combineReducers({
  floorPlan: floorPlanReducer,
  // globalState: globalReducer,
  // spacePlanner: spacePlannerReducer,
});

export default Reducers;
