import { axiosInstance } from '../../utils/axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  CLEAR_PROFILE,
} from '../constants/action-types';
import { setAlert } from './alertAction';
import handleErrors from '../../utils/handleError';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await axiosInstance.get('/users/me', {
      withCredentials: true,
    });
    dispatch({
      type: USER_LOADED,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({
  name,
  email,
  password,
  passwordConfirmation,
}) => async dispatch => {
  const body = {
    name,
    email,
    password,
    passwordConfirmation,
  };
  try {
    const res = await axiosInstance.post('/signup', body, {
      withCredentials: true,
    });
    const { status, token, ...payload } = res.data;
    dispatch({ type: REGISTER_SUCCESS, payload });
    dispatch(loadUser());
  } catch (err) {
    const errMsg = handleErrors(err);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login
export const login = ({ email, password }) => async dispatch => {
  const body = { email, password };
  try {
    const res = await axiosInstance.post('/login', body, {
      withCredentials: true,
    });
    const { status, token, ...payload } = res.data;
    dispatch({ type: LOGIN_SUCCESS, payload });
    dispatch(loadUser());
  } catch (err) {
    const errMsg = handleErrors(err);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout
export const logout = () => async dispatch => {
  try {
    await axiosInstance.post(
      '/logout',
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    const errMsg = handleErrors(err);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
  }
};
