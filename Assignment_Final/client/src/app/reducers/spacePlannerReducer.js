import {
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
} from '../actions/spacePlannerActions';

const INITIAL_STATE = {
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
    case GET_FLOOR_RESPONSE:
      if (!action.error) {
        newState = Object.assign(action.payload.data, { activeSeat: null, activeOccupant: null });
      } else {
        newState = state;
        // TODO: Error catcing
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
        newState = state;
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
      if (!action.error) {
        newState = Object.assign(
          {},
          state,
          { seats: action.payload.data.seats },
          { activeSeat: null }
        );
      } else {
        newState = Object.assign(
          {},
          state,
          { activeSeat: null },
        );
        // TODO: Error catcing
      }
      break;
    case UPDATE_SEAT_RESPONSE:
      newState = Object.assign(
        {},
        state,
        { activeSeat: null },
      );
      break;
    default:
      newState = state;
  }
  return newState;
};

export default seatsPlannerReducer;
