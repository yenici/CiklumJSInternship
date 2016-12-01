import {
  GET_FLOOR_REQUEST, GET_FLOOR_RESPONSE,
  SET_ACTIVE_SEAT, SEAT_MOVED,
} from '../actions/floorPlanActions';

const initialState = {
  id: '581f563cbc1c9f0f1c2faee5', // TODO: The hardcoded ID for the Floor Plan
  name: '',
  plan: '',
  seatRadius: 0,
  seats: [],
  activeSeat: null,
  office: {
    id: '',
    name: '',
    address: '',
  },
};

const floorPlanReducer = (state = initialState, action) => {
  let newState;
  let activeSeat;
  switch (action.type) {
    case GET_FLOOR_REQUEST:
      newState = state;
      break;
    case GET_FLOOR_RESPONSE:
      if (!action.error) {
        newState = Object.assign({}, state, {
          office: {
            id: action.payload.data.office._id, // TODO: Change the API to id
            name: action.payload.data.office.name,
            address: action.payload.data.office.address,
          },
          id: action.payload.data.floor.id,
          name: action.payload.data.floor.name,
          plan: action.payload.data.floor.plan,
          seatRadius: action.payload.data.seatRadius,
          seats: action.payload.data.seats,
          activeSeat: null,
        });
      } else {
        // TODO: Error catcing
        // newState = Object.assign(
        //   {},
        //   state,
        //   { errors: state.errors.concat([action.payload.message]) },
        // );
        newState = state;
      }
      break;
    case SET_ACTIVE_SEAT:
      activeSeat = state.seats.find(seat => seat.id === action.payload.data);
      if (activeSeat) {
        newState = Object.assign(
          {},
          state,
          { activeSeat: Object.assign({}, activeSeat, { modified: false }) }
        );
      } else {
        newState = Object.assign(
          {},
          state,
          { activeSeat: null }
        );
      }
      break;
    case SEAT_MOVED:
      newState = Object.assign(
        {},
        state,
        {
          activeSeat: {
            modified: true,
            id: state.activeSeat.id,
            name: state.activeSeat.name,
            occupant: state.activeSeat.occupant,
            occupantUrl: state.activeSeat.occupantUrl,
            position: action.payload.data.position,
          },
        },
      );
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

export default floorPlanReducer;