import {
  HIDE_ERROR_WINDOW,
  GET_FLOOR_RESPONSE,
  SET_ACTIVE_SEAT,
  GET_EMPLOYEE_RESPONSE,
  ADD_NEW_SEAT,
  SEAT_MOVED,
  SEAT_CHANGE_NAME,
  SEAT_CHANGE_OCCUPANT,
  SEAT_CANCEL_CHANGE,
  ADD_SEAT_RESPONSE,
  UPDATE_SEAT_RESPONSE,
  DELETE_SEAT_RESPONSE,
} from '../actions/spacePlannerActions';

import { LOGOUT } from '../actions/authActions';

const INITIAL_STATE = {
  errors: [],
  office: {
    id: '',
    name: '',
    address: '',
  },
  floor: {
    id: '',
    name: '',
    plan: '',
  },
  seatRadius: 0,
  seats: [],
  activeSeat: null,
  activeOccupant: null,
};

const seatsPlannerReducer = (state = INITIAL_STATE, action) => {
  let newState;
  let activeSeat;
  switch (action.type) {
    case HIDE_ERROR_WINDOW:
      newState = Object.assign(
        {},
        state,
        { errors: [].concat(state.errors.splice(1)) },
      );
      break;
    case LOGOUT:
      newState = Object.assign(
        {},
        state,
        { activeSeat: null },
      );
      break;
    case GET_FLOOR_RESPONSE:
      if (!action.error) {
        newState = Object.assign(action.payload.data,
          { activeSeat: null, activeOccupant: null, errors: state.errors });
      } else {
        // TODO: Error catcing
        newState = Object.assign(
          {},
          state,
          { errors: state.errors.concat([action.payload.message]) },
        );
      }
      break;
    case SET_ACTIVE_SEAT:
      activeSeat = state.seats.find(seat => seat.id === action.payload.data);
      if (!activeSeat) activeSeat = null;
      newState = Object.assign({}, state, { activeSeat, activeOccupant: null });
      break;
    case GET_EMPLOYEE_RESPONSE:
      if (!action.error) {
        newState = Object.assign({}, state, { activeOccupant: action.payload.data });
      } else {
        // TODO: Error catcing
        newState = Object.assign(
          {},
          state,
          { errors: state.errors.concat([action.payload.message]) },
        );
      }
      break;
    case ADD_NEW_SEAT:
      newState = Object.assign(
        {},
        state,
        { activeSeat: action.payload.data, activeOccupant: null }
      );
      break;
    case SEAT_MOVED:
      newState = Object.assign(
        {},
        state,
        {
          activeSeat: {
            id: state.activeSeat.id,
            name: state.activeSeat.name,
            occupant: state.activeSeat.occupant,
            occupantUrl: state.activeSeat.occupantUrl,
            position: action.payload.data.position,
          },
        },
      );
      break;
    case SEAT_CHANGE_NAME:
      newState = Object.assign(
        {},
        state,
        {
          activeSeat: {
            id: state.activeSeat.id,
            name: action.payload.data.name,
            occupant: state.activeSeat.occupant,
            occupantUrl: state.activeSeat.occupantUrl,
            position: state.activeSeat.position,
          },
        },
      );
      break;
    case SEAT_CHANGE_OCCUPANT:
      newState = Object.assign(
        {},
        state,
        {
          activeSeat: {
            id: state.activeSeat.id,
            name: state.activeSeat.name,
            occupant: action.payload.data.occupant,
            occupantUrl: null,
            position: state.activeSeat.position,
          },
        },
      );
      break;
    case SEAT_CANCEL_CHANGE:
      newState = Object.assign(
        {},
        state,
        { activeSeat: null },
      );
      break;
    case ADD_SEAT_RESPONSE:
    case DELETE_SEAT_RESPONSE:
      if (!action.error) {
        newState = Object.assign(
          {},
          state,
          { seats: action.payload.data.seats },
          { activeSeat: null }
        );
      } else {
        // newState = Object.assign({}, state, { activeSeat: null });
        newState = Object.assign(
          {},
          state,
          {
            activeSeat: null,
            errors: state.errors.concat([action.payload.message]),
          },
        );
        // TODO: Error catcing
      }
      break;
    case UPDATE_SEAT_RESPONSE:
      if (!action.error) {
        newState = Object.assign({}, state, { seats: action.payload.data.seats });
      } else {
        // newState = Object.assign({}, state, { activeSeat: null });
        newState = Object.assign(
          {},
          state,
          {
            activeSeat: null,
            errors: state.errors.concat([action.payload.message]),
          },
        );
        // TODO: Error catcing
      }
      break;
    default:
      newState = state;
  }
  return newState;
};

export default seatsPlannerReducer;
