import {
  GET_FLOOR_REQUEST,
  GET_FLOOR_RESPONSE,
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_RESPONSE,
  ADD_NEW_SEAT,
  SEAT_MOVED,
  SEAT_CHANGE_NAME,
  SEAT_CHANGE_OCCUPANT,
  SEAT_CANCEL_CHANGE,
  ADD_SEAT_REQUEST,
  ADD_SEAT_RESPONSE,
  UPDATE_SEAT_REQUEST,
  UPDATE_SEAT_RESPONSE,
  DELETE_SEAT_REQUEST,
  DELETE_SEAT_RESPONSE,
} from '../actions/spacePlannerActions';

const INITIAL_STATE = {
  actionsInProgress: 0, // Number of actions in progress for spinner
  userId: '',
  adminMode: false,
};

const globalReducer = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case GET_FLOOR_REQUEST:
    case GET_EMPLOYEE_REQUEST:
    case ADD_SEAT_REQUEST:
    case UPDATE_SEAT_REQUEST:
    case DELETE_SEAT_REQUEST:
      newState = Object.assign(
        {}, state,
        { actionsInProgress: state.actionsInProgress + 1 });
      break;
    case GET_FLOOR_RESPONSE:
    case GET_EMPLOYEE_RESPONSE:
      newState = Object.assign(
        {}, state,
        { actionsInProgress: state.actionsInProgress - 1 }
      );
      break;
    case ADD_NEW_SEAT:
      newState = Object.assign(
        {}, state,
        { modalMode: 'SEAT_ADD' }
      );
      break;
    case SEAT_MOVED:
    case SEAT_CHANGE_NAME:
    case SEAT_CHANGE_OCCUPANT:
      if (!state.modalMode) {
        newState = Object.assign(
          {}, state,
          { modalMode: 'SEAT_CHANGE' }
        );
      } else {
        newState = state;
      }
      break;
    case SEAT_CANCEL_CHANGE:
      if (state.modalMode === 'SEAT_ADD' || state.modalMode === 'SEAT_CHANGE') {
        newState = Object.assign(
          {}, state,
          { modalMode: null }
        );
      }
      break;
    case UPDATE_SEAT_RESPONSE:
    case ADD_SEAT_RESPONSE:
    case DELETE_SEAT_RESPONSE:
      newState = Object.assign(
        {}, state,
        { actionsInProgress: state.actionsInProgress - 1 },
        { modalMode: null }
      );
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

export default globalReducer;
