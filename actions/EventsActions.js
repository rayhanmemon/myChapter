import firebase from 'firebase';
import _ from 'lodash';

import {
  REQUEST_EVENTS_LIST_DATA,
  REQUEST_EVENTS_LIST_DATA_SUCCESS,
  REQUEST_EVENTS_LIST_DATA_FAILED,
  FETCH_EVENTS_ATTENDED,
  FETCH_EVENTS_ATTENDED_SUCCESS,
  CHECK_IN_ATTEMPTED,
  GET_CURRENT_LOCATION_SUCCESS,
  GET_CURRENT_LOCATION_FAILED,
  CHECK_IN_SUCCESS,
  EXPAND_SELECTED_EVENT,
  COLLAPSE_SELECTED_EVENT
} from '../constants/Types';


export const fetchEventsList = (organization, rank) => {
  return (dispatch) => {
    dispatch({ type: REQUEST_EVENTS_LIST_DATA });
    firebase.database().ref(`${organization}/events`)
    .on('value', snapshot => {
      const eventsList = _.map(snapshot.val(), (val, eventKey) => {
        return { ...val, eventKey };
      });
      dispatch({ type: REQUEST_EVENTS_LIST_DATA_SUCCESS, payload: eventsList });
    });

    dispatch({ type: FETCH_EVENTS_ATTENDED });
    firebase.database().ref(`${organization}/profiles/${rank}/eventsAttended`)
    .on('value', snapshot => {
      const eventsAttended = _.map(snapshot.val(), (val, eventKey) => {
        return { eventKey };
      });
      dispatch({ type: FETCH_EVENTS_ATTENDED_SUCCESS, payload: eventsAttended });
    });
  };
};

export const getCurrentLocationAndDate = () => {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: GET_CURRENT_LOCATION_SUCCESS,
          payload: position
        });
      },
      (error) => dispatch({ type: GET_CURRENT_LOCATION_FAILED, payload: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };
};

export const checkInAttempt = (firstName, lastName, organization, rank, eventKey, title, type) => {
  const name = `${firstName} ${lastName}`;

  let hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  let time = `${hours}:${minutes} AM`;

  if (hours > 12) {
    hours -= 12;
    time = `${hours}:${minutes} PM`;
  }

  return (dispatch) => {
    dispatch({ type: CHECK_IN_ATTEMPTED, payload: eventKey });

    firebase.database().ref(`${organization}/events/${eventKey}/attendees/${time}-${name}`)
    .set({ rank, name, time });

    firebase.database().ref(`${organization}/profiles/${rank}/eventsAttended/${eventKey}`)
    .set(title);

    switch (type) {
    case 'brotherhood':
      firebase.database().ref(`${organization}/profiles/${rank}/brotherhoods`)
      .transaction((value) => {
        if (value === null) {
          return 0;
        }
        return value + 1;
      });
      break;
    case 'mixer':
      firebase.database().ref(`${organization}/profiles/${rank}/mixers`)
      .transaction((value) => {
        if (value === null) {
          return 0;
        }
        return value + 1;
      });
      break;
    case 'chapter':
      firebase.database().ref(`${organization}/profiles/${rank}/chapters`)
      .transaction((value) => {
        if (value === null) {
          return 0;
        }
        return value + 1;
      });
      break;
    default:
      break;
    }
    dispatch({ type: CHECK_IN_SUCCESS });
  };
};

export const toggleAttendeeList = (isExpanded, eventKey) => {
  return (dispatch) => {
    if (isExpanded) {
      dispatch({ type: COLLAPSE_SELECTED_EVENT });
    } else {
    dispatch({ type: EXPAND_SELECTED_EVENT, payload: eventKey });
    }
  };
};
