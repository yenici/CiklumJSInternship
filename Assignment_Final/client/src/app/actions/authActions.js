import CiklumSpaceService from '../services/CiklumSpaceService';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const loginResponse = ({ data = [], message = '' }, error = false) => ({
  type: LOGIN_RESPONSE,
  payload: {
    data,
    message,
  },
  error,
});

export const login = (username, password) => (dispatch) => {
  dispatch(loginRequest());
  return CiklumSpaceService.login(username, password)
    .then(response => dispatch(loginResponse({ data: response })))
    .catch(error => dispatch(loginResponse({ message: error.toString() }, true)));
};

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT,
  payload: {
    data: null,
    message: '',
  },
  error: false,
});
