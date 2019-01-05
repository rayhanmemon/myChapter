import firebase from 'firebase';
import _ from 'lodash';

import {
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
} from '../constants/Types';

export const eventNameChanged = (text) => {
  return ({
    type: EVENT_NAME_CHANGED,
    payload: text
  });
};

export const setEventDate = (text) => {
  return ({
    type: SET_EVENT_DATE,
    payload: text
  });
};

export const setStartTime = (text) => {
  return ({
    type: SET_START_TIME,
    payload: text
  });
};

export const setEndTime = (text) => {
  return ({
    type: SET_END_TIME,
    payload: text
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
