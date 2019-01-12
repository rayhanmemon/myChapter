import {
  REQUEST_EVENTS_LIST_DATA,
  REQUEST_EVENTS_LIST_DATA_SUCCESS,
  REQUEST_EVENTS_LIST_DATA_FAILED,
  FETCH_EVENTS_ATTENDED,
  FETCH_EVENTS_ATTENDED_SUCCESS,
  CHECK_IN_ATTEMPTED,
  CHECK_IN_SUCCESS,
  GET_CURRENT_LOCATION_SUCCESS,
  GET_CURRENT_LOCATION_FAILED,
  EXPAND_SELECTED_EVENT,
  COLLAPSE_SELECTED_EVENT,
  GET_CURRENT_DATE_AND_TIME_SUCCESS,
  DELETE_EVENT_ATTEMPT,
  DELETE_EVENT_SUCCESS
} from '../constants/Types';

const INITIAL_STATE = {
  loadingList: false,
  error: '',
  selectedAttendeesList: '',
  listData: [],
  eventsAttended: [],
  eventLoading: '',
  currentLatitude: 0,
  currentLongitude: 0,
  currentDate: '',
  eventToDelete: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_EVENTS_LIST_DATA:
      return { ...state, loadingList: true };
    case REQUEST_EVENTS_LIST_DATA_SUCCESS:
      return { ...state, listData: action.payload };
    case REQUEST_EVENTS_LIST_DATA_FAILED:
      return { ...state, error: action.payload, loadingList: false };
    case FETCH_EVENTS_ATTENDED:
      return { ...state, loadingList: true };
    case FETCH_EVENTS_ATTENDED_SUCCESS:
      return { ...state, eventsAttended: action.payload, loadingList: false, error: '' };
    case CHECK_IN_ATTEMPTED:
      return { ...state, eventLoading: action.payload };
    case GET_CURRENT_LOCATION_SUCCESS:
      return { ...state,
        currentLatitude: action.payload.coords.latitude,
        currentLongitude: action.payload.coords.longitude,
        eventLoading: '',
      };
    case GET_CURRENT_LOCATION_FAILED:
      return { ...state, error: action.payload, eventLoading: '' };
    case CHECK_IN_SUCCESS:
      return { ...state, eventLoading: '' };
    case EXPAND_SELECTED_EVENT:
      return { ...state, selectedAttendeesList: action.payload };
    case COLLAPSE_SELECTED_EVENT:
      return { ...state, selectedAttendeesList: '' };
    case GET_CURRENT_DATE_AND_TIME_SUCCESS:
      return { ...state, currentDate: action.payload };
    case DELETE_EVENT_ATTEMPT:
      return { ...state, eventToDelete: action.payload };
    case DELETE_EVENT_SUCCESS:
      return { ...state, eventToDelete: '' };
    default:
      return state;
  }
};
