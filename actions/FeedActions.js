import firebase from 'firebase';
import _ from 'lodash';

import {
  POST_CHANGED,
  COMMENT_CHANGED,
  SEND_BUTTON_PRESSED,
  POST_SUCCESS,
  REQUEST_FEED_DATA,
  REQUEST_FEED_DATA_SUCCESS,
  DELETE_POST_ATTEMPTED,
  DELETE_POST_SUCCESS,
  SHOW_COMMENTS_ATTEMPTED,
  SHOW_COMMENTS_SUCCESS,
  RENDER_COMMENT_INPUT,
  HIDE_COMMENT_INPUT,
  COMMENT_ATTEMPTED,
  COMMENT_SUCCESS
} from '../constants/Types';

export const postChanged = (text) => {
  return {
    type: POST_CHANGED,
    payload: text
  };
};

export const commentChanged = (text) => {
  return {
    type: COMMENT_CHANGED,
    payload: text
  };
};

export const renderCommentInput = (key) => {
  return ({ type: RENDER_COMMENT_INPUT, payload: key });
};

export const hideCommentInput = () => {
  return { type: HIDE_COMMENT_INPUT };
};

export const showComments = (organization, key) => {
  return (dispatch) => {
    dispatch({ type: SHOW_COMMENTS_ATTEMPTED, payload: key });
    firebase.database().ref(`${organization}/comments/${key}`)
    .on('value', snapshot => {
      const array = _.map(snapshot.val(), (val, commentKey) => {
        return { ...val, commentKey };
      });
      const comments = array.reverse();
      dispatch({ type: SHOW_COMMENTS_SUCCESS, payload: comments });
    });
  };
};

export const deletePost = (organization, key) => {
  return (dispatch) => {
    dispatch({ type: DELETE_POST_ATTEMPTED, payload: key });
    firebase.database().ref(`${organization}/posts/${key}`).remove();
    dispatch({ type: DELETE_POST_SUCCESS });
  };
};

export const sendButtonPressed = (postContent, firstName, lastName, rank, organization) => {
  if (postContent) {
    return (dispatch) => {
      dispatch({ type: SEND_BUTTON_PRESSED });
      const name = `${firstName} ${lastName}`;
      const time = new Date().toLocaleString();
      const comments = 0;
      firebase.database().ref(`${organization}/posts`)
        .push({ name, rank, time, comments, postContent })
        .then(dispatch({ type: POST_SUCCESS }));
    };
  } return { type: '' };
};

export const onCommentButtonPress = (organization, firstName, lastName, key, commentContent) => {
  if (commentContent) {
    return (dispatch) => {
      dispatch({ type: COMMENT_ATTEMPTED });
      const name = `${firstName} ${lastName}`;
      const time = new Date().toLocaleString();
      firebase.database().ref(`${organization}/comments/${key}`)
        .set({ name, time, commentContent })
        .then(dispatch({ type: COMMENT_SUCCESS }));
    };
  } return { type: '' }; 
};

export const fetchFeed = (organization) => {
  return (dispatch) => {
    dispatch({ type: REQUEST_FEED_DATA });
    firebase.database().ref(`${organization}/posts`)
    .on('value', snapshot => {
      const array = _.map(snapshot.val(), (val, key) => {
        return { ...val, key };
      });
      const feed = array.reverse();
      dispatch({ type: REQUEST_FEED_DATA_SUCCESS, payload: feed });
    });
  };
};
