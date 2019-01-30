import {
  FETCH_ADMIN_SETTINGS,
  FETCH_ADMIN_SETTINGS_SUCCESS,
  GENERATE_NEW_CODE_ATTEMPT,
  GENERATE_NEW_CODE_SUCCESS,
  SAVE_NEW_THRESHOLD_ATTEMPT,
  SAVE_NEW_THRESHOLD_SUCCESS,
  NEW_THRESHOLD_CHANGED,
  LOGOUT_USER_FAILED
} from '../constants/Types';

const INITIAL_STATE = {
  loadingAdminSettings: false,
  securityCode: '',
  totalBrotherhoods: 0,
  totalChapters: 0,
  totalCommunityService: 0,
  totalDues: 0,
  totalMixers: 0,
  saving: false,
  newThreshold: '',
  errorMessage: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT_USER_FAILED:
      return { ...state, errorMessage: 'Error When Logging Out' };
    case FETCH_ADMIN_SETTINGS:
      return { ...state, loadingAdminSettings: true };
    case FETCH_ADMIN_SETTINGS_SUCCESS:
      return {
        ...state,
        loadingAdminSettings: false,
        securityCode: action.payload.securityCode,
        totalBrotherhoods: action.payload.totalBrotherhoods,
        totalChapters: action.payload.totalChapters,
        totalCommunityService: action.payload.totalCommunityService,
        totalDues: action.payload.totalDues,
        totalMixers: action.payload.totalMixers
      };
    case GENERATE_NEW_CODE_ATTEMPT:
      return { ...state, saving: true };
    case GENERATE_NEW_CODE_SUCCESS:
      return { ...state, saving: false, securityCode: action.payload };
    case SAVE_NEW_THRESHOLD_ATTEMPT:
      return { ...state, saving: true };
    case SAVE_NEW_THRESHOLD_SUCCESS:
      return { ...state, saving: false };
    case NEW_THRESHOLD_CHANGED:
      return { ...state, newThreshold: action.payload };
    default:
      return state;
  }
};
