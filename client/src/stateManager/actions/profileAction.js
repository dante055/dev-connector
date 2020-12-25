import { axiosInstance } from '../../utils/axios';
import handleErrors from '../../utils/handleError';
import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  TOGGLE_LOADING,
  UPDATE_PROFILE,
} from '../constants/action-types';
import { setAlert } from './alertAction';

// get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: true } });
    const res = await axiosInstance.get('/profiles/my', {
      withCredentials: true,
    });
    dispatch({ type: GET_PROFILE, payload: res.data.profile });
  } catch (error) {
    console.log(error);
    dispatch({ type: PROFILE_ERROR });
  } finally {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: false } });
  }
};

// get all profiles
export const getAllProfiles = id => async dispatch => {
  try {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: true } });
    const res = await axiosInstance.get(`/profiles`);

    dispatch({ type: GET_PROFILES, payload: res.data.profiles });
  } catch (error) {
    console.log(error);
    dispatch({ type: PROFILE_ERROR });
  } finally {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: false } });
  }
};

// get profile by user id
export const getProfileById = id => async dispatch => {
  try {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: TOGGLE_LOADING, payload: { loading: true } });
    const res = await axiosInstance.get(`/profiles/user/${id}`);
    dispatch({ type: GET_PROFILE, payload: res.data.profile });
  } catch (error) {
    console.log(error);
    dispatch({ type: PROFILE_ERROR });
  } finally {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: false } });
  }
};

// get githuub repo
export const getGitHubRepos = username => async dispatch => {
  try {
    const res = await axiosInstance.get(`/profiles/github/${username}`);
    dispatch({ type: GET_REPOS, payload: res.data.repos });
  } catch (error) {
    console.log(error);
    dispatch({ type: PROFILE_ERROR });
  }
};

// create and edit profile
export const createEditProfile = (
  body,
  history,
  edit = false
) => async dispatch => {
  try {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: true } });
    const res = await axiosInstance.post('/profiles/', body, {
      withCredentials: true,
    });
    dispatch({ type: GET_PROFILE, payload: res.data.profile });
    dispatch(
      setAlert(
        edit
          ? 'Profile successfully updated!'
          : 'Profile successfully created!',
        'success'
      )
    );

    if (!edit) {
      history.push('/dashboard');
      window.scrollTo(0, 0);
    }
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: PROFILE_ERROR });
  } finally {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: false } });
  }
};

// add experience
export const addExperience = (body, history) => async dispatch => {
  try {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: true } });
    const res = await axiosInstance.post('/profiles/experience', body, {
      withCredentials: true,
    });
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
    dispatch(setAlert('Experience added successfully!', 'success'));

    history.push('/dashboard');
    window.scrollTo(0, 0);
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: PROFILE_ERROR });
  } finally {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: false } });
  }
};

// add education
export const addEducation = (body, history) => async dispatch => {
  try {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: true } });
    const res = await axiosInstance.post('/profiles/education', body, {
      withCredentials: true,
    });
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
    dispatch(setAlert('Experience added successfully!', 'success'));

    history.push('/dashboard');
    window.scrollTo(0, 0);
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: PROFILE_ERROR });
  } finally {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: false } });
  }
};

// update education and experience

// delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: true } });
    const res = await axiosInstance.delete(`/profiles/experience/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
    dispatch(setAlert('Experience deleted successfully!', 'success'));

    window.scrollTo(0, 0);
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: PROFILE_ERROR });
  } finally {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: false } });
  }
};

// delete Education
export const deleteEducation = id => async dispatch => {
  try {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: true } });
    const res = await axiosInstance.delete(`/profiles/education/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
    dispatch(setAlert('Education deleted successfully!', 'success'));

    window.scrollTo(0, 0);
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: PROFILE_ERROR });
  } finally {
    dispatch({ type: TOGGLE_LOADING, payload: { loading: false } });
  }
};

// delete Account
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      dispatch({ type: TOGGLE_LOADING, payload: { loading: true } });
      await axiosInstance.delete('/users/me', { withCredentials: true });

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(
        setAlert('Your account has been permanently deleted'),
        'success'
      );
    } catch (error) {
      const errMsg = handleErrors(error);
      errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
      dispatch({
        type: PROFILE_ERROR,
      });
    } finally {
      dispatch({ type: TOGGLE_LOADING, payload: { loading: false } });
    }
  }
};
