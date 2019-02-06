import firebase from 'firebase';
import _ from 'lodash';

import {
  CREATE_EVENT_ATTEMPT,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  SHOW_DATE_PICKER,
  HIDE_DATE_PICKER,
  SHOW_START_TIME_PICKER,
  HIDE_START_TIME_PICKER,
  SHOW_END_TIME_PICKER,
  HIDE_END_TIME_PICKER,
  EVENT_NAME_CHANGED,
  EVENT_DESCRIPTION_CHANGED,
  SET_EVENT_DATE,
  SET_START_TIME,
  SET_END_TIME,
  LATITUDE_CHANGED,
  LONGITUDE_CHANGED,
  SET_EVENT_TYPE,
  LOCATION_NAME_CHANGED
} from '../constants/Types';

export const createEvent = (organization, locationName, eventDate, year, month, day, longitude, latitude, startTime, endTime, eventDescription, eventName, eventType) => {
  let eventTypeTotal = '';

  if (eventType === 'chapter') {
    eventTypeTotal = 'totalChapters';
  } else if (eventType === 'brotherhood') {
    eventTypeTotal = 'totalBrotherhoods';
  } else if (eventType === 'mixer') {
    eventTypeTotal = 'totalMixers';
  } else if (eventType === 'communityService') {
    eventTypeTotal = 'TotalCommunityService';
  }

  return (dispatch) => {
    dispatch({ type: CREATE_EVENT_ATTEMPT });
    firebase.database().ref(`/${organization}/events/${year}-${month}-${day} ${startTime}`)
      .set({
        locationName,
        date: eventDate,
        year,
        month,
        day,
        longitude,
        latitude,
        startTime,
        endTime,
        description: eventDescription,
        title: eventName,
        type: eventType
      })
      .then(() => {
        if (eventTypeTotal) {
          firebase.database().ref(`${organization}/admin/${eventTypeTotal}`)
          .once('value', snapshot => {
            const total = snapshot.val();
            return firebase.database().ref(`${organization}/admin/${eventTypeTotal}`)
            .set(total + 1);
          });
        } return;
      })
      .then(() => {
        dispatch({ type: CREATE_EVENT_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: CREATE_EVENT_ERROR, payload: 'Failed to Create Event' });
      });
  };
};

export const locationNameChanged = (text) => {
  return ({
    type: LOCATION_NAME_CHANGED,
    payload: text
  });
};

export const setEventType = (eventType) => {
  return ({
    type: SET_EVENT_TYPE,
    payload: eventType
  });
};

export const latitudeChanged = (text) => {
  return ({
    type: LATITUDE_CHANGED,
    payload: text
  });
};

export const longitudeChanged = (text) => {
  return ({
    type: LONGITUDE_CHANGED,
    payload: text
  });
};

export const eventNameChanged = (text) => {
  return ({
    type: EVENT_NAME_CHANGED,
    payload: text
  });
};

export const setEventDate = (dateString, year, month, day) => {
  return ({
    type: SET_EVENT_DATE,
    payload: { dateString, year, month, day }
  });
};

export const setStartTime = (startTimeString) => {
  return ({
    type: SET_START_TIME,
    payload: startTimeString
  });
};

export const setEndTime = (endTimeString) => {
  return ({
    type: SET_END_TIME,
    payload: endTimeString
  });
};

export const eventDescriptionChanged = (text) => {
  return ({
    type: EVENT_DESCRIPTION_CHANGED,
    payload: text
  });
};

export const showDatePicker = () => {
  return ({ type: SHOW_DATE_PICKER });
};

export const hideDatePicker = () => {
  return ({ type: HIDE_DATE_PICKER });
};

export const showStartTimePicker = () => {
  return ({ type: SHOW_START_TIME_PICKER });
};

export const hideStartTimePicker = () => {
  return ({ type: HIDE_START_TIME_PICKER });
};

export const showEndTimePicker = () => {
  return ({ type: SHOW_END_TIME_PICKER });
};

export const hideEndTimePicker = () => {
  return ({ type: HIDE_END_TIME_PICKER });
};
