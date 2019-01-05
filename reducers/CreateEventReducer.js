import {
  CREATE_EVENT_ATTEMPT,
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

const INITIAL_STATE = {
  eventName: '',
  eventDescription: '',
  isDatePickerVisible: false,
  isStartTimePickerVisible: false,
  isEndTimePickerVisible: false,
  eventDate: 'Select Date',
  startTime: 'Select Start Time',
  endTime: 'Select End Time',
  latitude: 0,
  longitude: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_EVENT_ATTEMPT:
      return { ...state };
    case SHOW_DATE_PICKER:
      return { ...state, isDatePickerVisible: true };
    case HIDE_DATE_PICKER:
      return { ...state, isDatePickerVisible: false };
    case SHOW_START_TIME_PICKER:
      return { ...state, isStartTimePickerVisible: true };
    case HIDE_START_TIME_PICKER:
      return { ...state, isStartTimePickerVisible: false };
    case SHOW_END_TIME_PICKER:
      return { ...state, isEndTimePickerVisible: true };
    case HIDE_END_TIME_PICKER:
      return { ...state, isEndTimePickerVisible: false };
    case EVENT_NAME_CHANGED:
      return { ...state, eventName: action.payload };
    case EVENT_DESCRIPTION_CHANGED:
      return { ...state, eventDescription: action.payload };
    case SET_EVENT_DATE:
      return { ...state, eventDate: action.payload };
    case SET_START_TIME:
      return { ...state, startTime: action.payload };
    case SET_END_TIME:
      return { ...state, endTime: action.payload };
    default:
      return INITIAL_STATE;
  }
};
