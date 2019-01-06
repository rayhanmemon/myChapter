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
  LATITUDE_CHANGED,
  LONGITUDE_CHANGED,
  SET_EVENT_TYPE,
  LOCATION_NAME_CHANGED
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
  locationName: '',
  latitude: '',
  longitude: '',
  eventType: '',
  loading: false,
  year: 0,
  month: 0,
  day: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_EVENT_ATTEMPT:
      return { ...state, loading: true };
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
      return {
        ...state,
        eventDate: action.payload.dateString,
        year: action.payload.year,
        month: action.payload.month,
        day: action.payload.day
      };
    case SET_START_TIME:
      return { ...state, startTime: action.payload };
    case SET_END_TIME:
      return { ...state, endTime: action.payload };
    case LATITUDE_CHANGED:
      return { ...state, latitude: action.payload };
    case LONGITUDE_CHANGED:
      return { ...state, longitude: action.payload };
    case SET_EVENT_TYPE:
      return { ...state, eventType: action.payload };
    case LOCATION_NAME_CHANGED:
      return { ...state, locationName: action.payload };
    default:
      return INITIAL_STATE;
  }
};
