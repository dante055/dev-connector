import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  TOGGLE_LOADING,
} from '../constants/action-types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload };
    case GET_PROFILES:
      return { ...state, profiles: payload };
    case GET_REPOS:
      return { ...state, repos: payload };
    case PROFILE_ERROR:
      return { ...state };
    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [] };
    case TOGGLE_LOADING:
      return { ...state, ...payload };
    default:
      return state;
  }
}
