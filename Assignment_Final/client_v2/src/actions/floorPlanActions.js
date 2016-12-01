import CiklumSpaceService from '../services/CiklumSpaceService';

export const GET_FLOOR_REQUEST = 'GET_FLOOR_REQUEST';
export const getFloorInfoRequest = () => ({
  type: GET_FLOOR_REQUEST,
});

export const GET_FLOOR_RESPONSE = 'GET_FLOOR_RESPONSE';
export const getFloorInfoResponse = ({ data = [], message = '' }, error = false) => ({
  type: GET_FLOOR_RESPONSE,
  payload: {
    data,
    message,
  },
  error,
});

export const getFloorInfo = floorPlanId => (dispatch) => {
  dispatch(getFloorInfoRequest());
  return CiklumSpaceService.getFloor(floorPlanId)
    .then(response => dispatch(getFloorInfoResponse({ data: response })))
    .catch(error => dispatch(getFloorInfoResponse({ message: error.toString() }, true)));
};

export const SET_ACTIVE_SEAT = 'SET_ACTIVE_SEAT';
export const setActiveSeat = seatId => ({
  type: SET_ACTIVE_SEAT,
  payload: {
    data: seatId,
    message: '',
  },
  error: false,
});

export const SEAT_MOVED = 'SEAT_MOVED';
export const moveSeat = (x, y) => ({
  type: SEAT_MOVED,
  payload: {
    data: {
      position: { x, y },
    },
    message: '',
  },
  error: false,
});
