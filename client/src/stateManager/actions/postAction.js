import { axiosInstance } from '../../utils/axios';
import handleErrors from '../../utils/handleError';
import {
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  POST_LOADING,
  UPDATE_LIKES,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from '../constants/action-types';
import { setAlert } from './alertAction';

// GET posts
export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: POST_LOADING });
    const res = await axiosInstance.get(`/posts`);

    dispatch({ type: GET_POSTS, payload: res.data.posts });
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: POST_ERROR });
  }
  /* finally {
    dispatch({ type: POST_LOADED });
  } */
};

// get post by id
export const getPostById = id => async dispatch => {
  try {
    dispatch({ type: POST_LOADING });
    const res = await axiosInstance.get(`/posts/${id}`);

    dispatch({ type: GET_POST, payload: res.data.post });
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: POST_ERROR });
  }
};

export const likePosts = id => async dispatch => {
  try {
    const res = await axiosInstance.post(
      `/posts/${id}/like`,
      {},
      { withCredentials: true }
    );
    dispatch({
      type: UPDATE_LIKES,
      payload: res.data.post,
    });
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: POST_ERROR });
  }
};

export const dislikePosts = id => async dispatch => {
  try {
    const res = await axiosInstance.post(
      `/posts/${id}/dislike`,
      {},
      { withCredentials: true }
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: res.data.post,
    });
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: POST_ERROR });
  }
};

export const deletePost = (id, history, redirect = false) => async dispatch => {
  try {
    await axiosInstance.delete(`/posts/${id}`, { withCredentials: true });
    console.log('deleted');
    dispatch({
      type: DELETE_POST,
      payload: { id },
    });
    if (redirect) {
      history.push('/posts');
      window.scrollTo(0, 0);
    }
    dispatch(setAlert('Post deleted', 'success'));
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: POST_ERROR });
  }
};

export const addPost = text => async dispatch => {
  const body = { text };
  try {
    const res = await axiosInstance.post(`/posts`, body, {
      withCredentials: true,
    });

    dispatch({
      type: ADD_POST,
      payload: res.data.post,
    });
    dispatch(setAlert('Post added', 'success'));
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: POST_ERROR });
  }
};

export const addComment = (postId, text) => async dispatch => {
  const body = { text };
  try {
    const res = await axiosInstance.post(`/posts/${postId}/comment`, body, {
      withCredentials: true,
    });

    dispatch({
      type: ADD_COMMENT,
      payload: res.data.post.comments,
    });
    dispatch(setAlert('Comment added', 'success'));
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: POST_ERROR });
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axiosInstance.delete(`/posts/${postId}/comment/${commentId}`, {
      withCredentials: true,
    });

    dispatch({
      type: DELETE_COMMENT,
      payload: { id: commentId },
    });
    dispatch(setAlert('Comment deleted successfully!!', 'success'));
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: POST_ERROR });
  }
};
