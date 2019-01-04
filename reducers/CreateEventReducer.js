import {
  CREATE_EVENT_ATTEMPT,
  SHOW_DATE_PICKER,
  HIDE_DATE_PICKER,
  SHOW_START_TIME_PICKER,
  HIDE_START_TIME_PICKER,
  SHOW_END_TIME_PICKER,
  HIDE_END_TIME_PICKER,
  SET_START_TIME
} from '../constants/Types';

const INITIAL_STATE = {
  eventName: '',
  eventDescription: '',
  isDatePickerVisible: false,
  isStartTimePickerVisible: false,
  isEndTimePickerVisible: false,
  eventYear: 0,
  eventMonth: 0,
  eventDay: 0,
  startTime: '10:00',
  endTime: '11:00',
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
    case SET_START_TIME:
      return { ...state, startTime: action.payload };
    default:
      return INITIAL_STATE;
  }
};
