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
  COMMENT_CHANGED,
  SELECT_FOR_COMMENTING,
  COMMENT_ATTEMPTED,
  COMMENT_SUCCESS,
  CANCEL_COMMENTING,
  HIDE_COMMENTS,
  FETCH_USERS_STATS,
  DELETE_COMMENT_ATTEMPTED,
  DELETE_COMMENT_SUCCESS
} from '../constants/Types';

const INITIAL_STATE = {
  postContent: '',
  commentContent: '',
  commenting: false,
  posting: false,
  loadingList: true,
  feedData: [],
  postToDelete: '',
  commentToDelete: '',
  comments: [],
  commentsShown: '',
  messageBoxHeight: 40,
  selectedForCommenting: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS_STATS:
      return { ...state, loadingList: true };
    case HIDE_COMMENTS:
      return { ...state, commentsShown: '' };
    case CANCEL_COMMENTING:
      return { ...state, commentContent: '', selectedForCommenting: '' };
    case COMMENT_ATTEMPTED:
      return { ...state, commenting: true };
    case COMMENT_SUCCESS:
      return { ...state, commenting: false, commentContent: '' };
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
    case DELETE_COMMENT_ATTEMPTED:
      return { ...state, commentToDelete: action.payload };
    case DELETE_COMMENT_SUCCESS:
      return { ...state, commentToDelete: '' };
    case SHOW_COMMENTS_ATTEMPTED:
      return { ...state, commentsShown: action.payload };
    case SHOW_COMMENTS_SUCCESS:
      return { ...state, comments: action.payload };
    case SELECT_FOR_COMMENTING:
      return { ...state, selectedForCommenting: action.payload };
    default:
      return { state };
  }
};
