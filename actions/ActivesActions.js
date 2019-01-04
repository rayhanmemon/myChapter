import firebase from 'firebase';
import _ from 'lodash';

import {
  REQUEST_LIST_DATA,
  REQUEST_LIST_DATA_SUCCESS,
  REQUEST_LIST_DATA_FAILED,
  FETCH_SELECTED_PROFILE,
  FETCH_SELECTED_PROFILE_SUCCESS
} from '../constants/Types';

export const fetchActivesList = (organization) => {
  return (dispatch) => {
    dispatch({ type: REQUEST_LIST_DATA });
    firebase.database().ref(`${organization}/activesList`)
    .on('value', snapshot => {
      const activesList = _.map(snapshot.val(), (val, rank) => {
        return { ...val, rank };
      });
      dispatch({ type: REQUEST_LIST_DATA_SUCCESS, payload: activesList });
    });
  };
};

export const fetchSelectedProfile = (organization, rank) => {
  return (dispatch) => {
    dispatch({ type: FETCH_SELECTED_PROFILE });
      firebase.database().ref(`${organization}/profiles/${rank}`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_SELECTED_PROFILE_SUCCESS, payload: snapshot.val() });
      });
  };
};
