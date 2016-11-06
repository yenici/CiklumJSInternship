import CiklumSpaceService from './CiklumSpaceService';

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

export const getFloorInfo = (floorPlanId) => (dispatch) => {
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

export const GET_EMPLOYEE_REQUEST = 'GET_EMPLOYEE_REQUEST';
export const getEmployeeRequest = () => ({
  type: GET_EMPLOYEE_REQUEST,
});


export const GET_EMPLOYEE_RESPONSE = 'GET_EMPLOYEE_RESPONSE';
export const getEmployeeResponse = ({ data = [], message = '' }, error = false) => ({
  type: GET_EMPLOYEE_RESPONSE,
  payload: {
    data,
    message,
  },
  error,
});

export const getEmployee = employeeId => (dispatch) => {
  dispatch(getEmployeeRequest());
  return CiklumSpaceService.getEmployee(employeeId)
    .then(response => dispatch(getEmployeeResponse({ data: response })))
    .catch(error => dispatch(getEmployeeResponse({ message: error.toString() }, true)));
};

export const ADD_NEW_SEAT = 'ADD_NEW_SEAT';
export const addNewSeat = () => ({
  type: ADD_NEW_SEAT,
  payload: {
    data: {
      id: '*',
      name: 'New seat',
      occupant: null,
      occupantUrl: null,
      position: {
        x: 0,
        y: 0,
      },
    },
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

export const SEAT_CHANGE_NAME = 'SEAT_CHANGE_NAME';
export const changeSeatName = name => ({
  type: SEAT_CHANGE_NAME,
  payload: {
    data: {
      name,
    },
    message: '',
  },
  error: false,
});

export const SEAT_CHANGE_OCCUPANT = 'SEAT_CHANGE_OCCUPANT';
export const changeSeatOccupant = occupant => ({
  type: SEAT_CHANGE_OCCUPANT,
  payload: {
    data: {
      occupant,
    },
    message: '',
  },
  error: false,
});

export const SEAT_CANCEL_CHANGE = 'SEAT_CANCEL_CHANGE';
export const cancelSeatChange = () => ({
  type: SEAT_CANCEL_CHANGE,
  payload: {
    message: '',
  },
  error: false,
});

export const UPDATE_SEAT_REQUEST = 'UPDATE_SEAT_REQUEST';
export const updateSeatRequest = () => ({
  type: UPDATE_SEAT_REQUEST,
});

export const UPDATE_SEAT_RESPONSE = 'UPDATE_SEAT_RESPONSE';
export const updateSeatResponse = ({ data = [], message = '' }, error = false) => ({
  type: UPDATE_SEAT_RESPONSE,
  payload: {
    data,
    message,
  },
  error,
});

export const updateSeat = (floorPlanId, seat) => (dispatch) => {
  dispatch(updateSeatRequest());
  return CiklumSpaceService.updateSeat(floorPlanId, seat)
    .then(response => dispatch(updateSeatResponse({ data: response })))
    .catch(error => dispatch(updateSeatResponse({ message: error.toString() }, true)));
};

export const ADD_SEAT_REQUEST = 'ADD_SEAT_REQUEST';
export const addSeatRequest = () => ({
  type: ADD_SEAT_REQUEST,
});

export const ADD_SEAT_RESPONSE = 'ADD_SEAT_RESPONSE';
export const addSeatResponse = ({ data = [], message = '' }, error = false) => ({
  type: ADD_SEAT_RESPONSE,
  payload: {
    data,
    message,
  },
  error,
});

export const addSeat = (floorPlanId, seat) => (dispatch) => {
  dispatch(addSeatRequest());
  return CiklumSpaceService.addSeat(floorPlanId, seat)
    .then(response => dispatch(addSeatResponse({ data: response })))
    .catch(error => dispatch(addSeatResponse({ message: error.toString() }, true)));
};
