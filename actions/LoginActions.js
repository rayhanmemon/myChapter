import firebase from 'firebase';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  RESET_AUTH_STATE,
  FETCH_ORG_AND_RANK,
  FETCH_ORG_AND_RANK_SUCCESS,
  FETCH_USERS_STATS,
  FETCH_USERS_STATS_SUCCESS,
} from '../constants/Types';

export const resetAuthState = () => {
  return {
    type: RESET_AUTH_STATE
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user.user.uid });
      })
      .catch(() => {
        dispatch({ type: LOGIN_USER_FAIL });
      });
  };
};

export const fetchUsersOrgAndRank = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ORG_AND_RANK });
    const user = firebase.auth().currentUser;
    firebase.database().ref(`users/${user.uid}`)
    .on('value', snapshot => {
      dispatch({ type: FETCH_ORG_AND_RANK_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const fetchUsersStats = (organization, rank) => {
  return (dispatch) => {
    dispatch({ type: FETCH_USERS_STATS });
      firebase.database().ref(`${organization}/profiles/${rank}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_USERS_STATS_SUCCESS, payload: snapshot.val() });
      });
  };
};
