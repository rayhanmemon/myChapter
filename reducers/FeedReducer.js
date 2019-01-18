import {
  POST_CHANGED,
  SEND_BUTTON_PRESSED,
  POST_SUCCESS,
  REQUEST_FEED_DATA,
  REQUEST_FEED_DATA_SUCCESS,
  DELETE_POST_ATTEMPTED,
  DELETE_POST_SUCCESS,
  SHOW_COMMENTS_ATTEMPTED,
  SHOW_COMMENTS_SUCCESS,
  RENDER_COMMENT_INPUT,
  HIDE_COMMENT_INPUT,
  COMMENT_CHANGED,
} from '../constants/Types';

const INITIAL_STATE = {
  postContent: '',
  commentContent: '',
  commenting: false,
  posting: false,
  loadingList: true,
  feedData: [],
  postToDelete: '',
  comments: [],
  commentsLoading: '',
  messageBoxHeight: 40,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_CHANGED:
      return { ...state, postContent: action.payload };
    case COMMENT_CHANGED:
      return { ...state, commentContent: action.payload };
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
    case SHOW_COMMENTS_ATTEMPTED:
      return { ...state, commentsLoading: action.payload };
    case SHOW_COMMENTS_SUCCESS:
      return { ...state, commentsLoading: '', comments: action.payload };
    default:
      return { state };
  }
};
