import {
  REG_CHAPTER_CHANGED,
  REG_CODE_CHANGED,
  REG_EMAIL_CHANGED,
  REG_PASSWORD_CHANGED,
  REG_FIRST_NAME_CHANGED,
  REG_LAST_NAME_CHANGED,
  REG_RANK_CHANGED,
  REG_POSITION_CHANGED,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
  WRONG_REG_CODE,
  RESET_REGISTER_STATE,
} from '../constants/Types.js';

const INITIAL_STATE = {
  organization: '',
  regCode: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  rank: '',
  position: '',
  loading: false,
  error: '',
  registerSuccess: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REG_CHAPTER_CHANGED:
      return { ...state, organization: action.payload };
    case REG_CODE_CHANGED:
      return { ...state, regCode: action.payload };
    case REG_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case REG_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case REG_FIRST_NAME_CHANGED:
      return { ...state, firstName: action.payload };
    case REG_LAST_NAME_CHANGED:
      return { ...state, lastName: action.payload };
    case REG_RANK_CHANGED:
      return { ...state, rank: action.payload };
    case REG_POSITION_CHANGED:
      return { ...state, position: action.payload };
    case REGISTRATION:
      return { ...state, loading: true, error: '' };
    case REGISTRATION_SUCCESS:
      return { ...state, loading: false, error: '', registerSuccess: true };
    case REGISTRATION_FAIL:
      return { ...state, loading: false, error: action.payload };
    case RESET_REGISTER_STATE:
      return { INITIAL_STATE };
    default:
      return state;
  }
};
