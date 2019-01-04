import firebase from 'firebase';
import _ from 'lodash';

import {
  SHOW_DATE_PICKER,
  HIDE_DATE_PICKER,
  SHOW_START_TIME_PICKER,
  HIDE_START_TIME_PICKER,
  SHOW_END_TIME_PICKER,
  HIDE_END_TIME_PICKER,
  SET_START_TIME,
} from '../constants/Types';

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

export const setStartTime = (time) => {
  return ({ type: SET_START_TIME, payload: time });
};
