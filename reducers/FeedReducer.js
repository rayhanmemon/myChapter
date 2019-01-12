import {
  POST_CHANGED,
  SEND_BUTTON_PRESSED,
  POST_SUCCESS,
  REQUEST_FEED_DATA,
  REQUEST_FEED_DATA_SUCCESS,
  DELETE_POST_ATTEMPTED,
  DELETE_POST_SUCCESS
} from '../constants/Types';

const INITIAL_STATE = {
  postContent: '',
  posting: false,
  loadingList: true,
  feedData: [],
  postToDelete: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_CHANGED:
      return { ...state, postContent: action.payload };
    case SEND_BUTTON_PRESSED:
      return { ...state, posting: true };
    case POST_SUCCESS:
      return { ...state, posting: false, postContent: '' };
    case REQUEST_FEED_DATA:
      return { ...state, loadingList: true };
    case REQUEST_FEED_DATA_SUCCESS:
      return { ...state, feedData: action.payload, loadingList: false };
    case DELETE_POST_ATTEMPTED:
      return { ...state, postToDelete: action.payload };
    case DELETE_POST_SUCCESS:
      return { ...state, postToDelete: '' };
    default:
      return { state };
  }
};
