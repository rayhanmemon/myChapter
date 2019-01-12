import firebase from 'firebase';
import _ from 'lodash';

import {
  POST_CHANGED,
  SEND_BUTTON_PRESSED,
  POST_SUCCESS,
  REQUEST_FEED_DATA,
  REQUEST_FEED_DATA_SUCCESS,
  DELETE_POST_ATTEMPTED,
  DELETE_POST_SUCCESS
} from '../constants/Types';

export const postChanged = (text) => {
  return {
    type: POST_CHANGED,
    payload: text
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
