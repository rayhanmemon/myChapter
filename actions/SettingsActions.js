import firebase from 'firebase';
import _ from 'lodash';

import {
  FETCH_ADMIN_SETTINGS,
  FETCH_ADMIN_SETTINGS_SUCCESS,
  GENERATE_NEW_CODE_ATTEMPT,
  GENERATE_NEW_CODE_SUCCESS,
  NEW_THRESHOLD_CHANGED,
  SAVE_NEW_THRESHOLD_ATTEMPT,
  SAVE_NEW_THRESHOLD_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_FAILED
} from '../constants/Types';

export const logout = () => {
  return (dispatch) => {
    firebase.auth().signOut()
    .then(() => {
      dispatch({ type: LOGOUT_USER });
    })
    .catch((error) => {
      dispatch({ type: LOGOUT_USER_FAILED, payload: error });
    });
  };
};

export const fetchAdminSettings = (organization) => {
  return (dispatch) => {
    dispatch({ type: FETCH_ADMIN_SETTINGS });
    firebase.database().ref(`${organization}/admin`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_ADMIN_SETTINGS_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const generateSecurityCode = (organization) => {
  const randomCode = `${organization}-${(Math.floor(Math.random() * 10000) + 99999).toString()}`;

  return (dispatch) => {
    dispatch({ type: GENERATE_NEW_CODE_ATTEMPT });
    firebase.database().ref(`${organization}/admin`).child('securityCode').set(randomCode)
    .then(() => {
      dispatch({ type: GENERATE_NEW_CODE_SUCCESS, payload: randomCode });
    });
  };
};

export const newThresholdChanged = (text) => {
  return ({
    type: NEW_THRESHOLD_CHANGED,
    payload: text
  });
};

export const saveNewThreshold = (organization, value, newThreshold) => {
  if (newThreshold) {
    return (dispatch) => {
      const newVal = parseInt(newThreshold, 10);
      dispatch({ type: SAVE_NEW_THRESHOLD_ATTEMPT });
      firebase.database().ref(`${organization}/admin/${value}`).set(newVal)
      .then(() => {
        dispatch({ type: SAVE_NEW_THRESHOLD_SUCCESS });
      });
    };
  } return { type: '' };
};
