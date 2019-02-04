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
  COMMENT_ATTEMPTED,
  COMMENT_SUCCESS,
  SELECT_FOR_COMMENTING,
  CANCEL_COMMENTING,
  HIDE_COMMENTS,
  FETCH_USERS_STATS,
  FETCH_USERS_STATS_SUCCESS,
} from '../constants/Types';

export const fetchUsersStats = (organization, rank) => {
  return (dispatch) => {
    dispatch({ type: FETCH_USERS_STATS });
      firebase.database().ref(`${organization}/profiles/${rank}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_USERS_STATS_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const hideComments = () => {
  return { type: HIDE_COMMENTS };
};

export const postChanged = (text) => {
  return {
    type: POST_CHANGED,
    payload: text
  };
};

export const selectForCommenting = (key) => {
  if (key) {
    return {
      type: SELECT_FOR_COMMENTING,
      payload: key
    };
  } return {
    type: CANCEL_COMMENTING
  };
};

export const commentChanged = (text) => {
  return {
    type: COMMENT_CHANGED,
    payload: text
  };
};

export const showComments = (organization, key) => {
  return (dispatch) => {
    dispatch({ type: SHOW_COMMENTS_ATTEMPTED, payload: key });
    firebase.database().ref(`${organization}/comments/${key}`)
    .on('value', snapshot => {
      const comments = _.map(snapshot.val(), (val, commentKey) => {
        return { ...val, commentKey };
      });
      dispatch({ type: SHOW_COMMENTS_SUCCESS, payload: comments });
    });
  };
};

export const deletePost = (organization, key) => {
  return (dispatch) => {
    dispatch({ type: DELETE_POST_ATTEMPTED, payload: key });
    firebase.database().ref(`${organization}/posts/${key}`).remove()
    .then(() => {
      firebase.database().ref(`${organization}/comments/${key}`).remove()
      .then(() => {
        dispatch({ type: DELETE_POST_SUCCESS });
      });
    });
  };
};

export const sendButtonPressed = (postContent, firstName, lastName, rank, organization) => {
  return (dispatch) => {
    dispatch({ type: SEND_BUTTON_PRESSED });
    const name = `${firstName} ${lastName}`;
    const time = new Date().toLocaleString();
    const comments = 0;
    firebase.database().ref(`${organization}/posts`)
      .push({ name, rank, time, comments, postContent })
      .then(dispatch({ type: POST_SUCCESS }));
  };
};

export const onCommentButtonPress = (organization, firstName, lastName, key, commentContent, comments) => {
  return (dispatch) => {
    dispatch({ type: COMMENT_ATTEMPTED });
    const name = `${firstName} ${lastName}`;
    const time = new Date().toLocaleString();
    firebase.database().ref(`${organization}/comments/${key}`)
      .push({ name, time, commentContent })
      .then(() => {
        firebase.database().ref(`${organization}/posts/${key}/comments`)
        .set(comments + 1);
      })
      .then(dispatch({ type: COMMENT_SUCCESS }));
  };
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
