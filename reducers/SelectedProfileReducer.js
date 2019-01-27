import {
  INITIALIZE_TOTALS,
  TOGGLE_ADMIN_MODE,
  EDIT_POSITION,
  EDIT_DUES,
  EDIT_COMMUNITYSERVICE,
  EDIT_CHAPTERS,
  EDIT_MIXERS,
  EDIT_BROTHERHOODS,
  EDIT_GOOD_STANDING,
  EDIT_ADMIN,
  SAVE_NEW_STATS,
  SAVE_NEW_STATS_SUCCESS,
  SAVE_NEW_STATS_FAILED,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  SET_INITIAL_VALUES
} from '../constants/Types';

const INITIAL_STATE = {
  adminModeActive: false,
  image: null,
  totalDues: 0,
  totalCommunityService: 0,
  totalChapters: 0,
  totalMixers: 0,
  totalBrotherhoods: 0,
  brotherhoods: '',
  chapters: '',
  communityService: '',
  dues: '',
  firstName: '',
  lastName: '',
  mixers: '',
  position: '',
  goodStanding: 'true',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_INITIAL_VALUES:
      return {
        ...state,
        brotherhooods: action.payload.brotherhoodsInitial,
        chapters: action.payload.chaptersInitial,
        communityService: action.payload.communityServiceInitial,
        dues: action.payload.duesInitial,
        mixers: action.payload.mixersInitial,
        position: action.payload.positionInitial
      };
    case INITIALIZE_TOTALS:
      return {
        ...state,
        totalDues: action.payload.totalDues,
        totalCommunityService: action.payload.totalCommunityService,
        totalChapters: action.payload.totalChapters,
        totalMixers: action.payload.totalMixers,
        totalBrotherhoods: action.payload.totalBrotherhoods,
      };
    case TOGGLE_ADMIN_MODE:
      return { ...state, adminModeActive: action.payload };
    case EDIT_POSITION:
      return { ...state, position: action.payload };
    case EDIT_DUES:
      return { ...state, dues: action.payload };
    case EDIT_COMMUNITYSERVICE:
      return { ...state, communityService: action.payload };
    case EDIT_CHAPTERS:
      return { ...state, chapters: action.payload };
    case EDIT_MIXERS:
      return { ...state, mixers: action.payload };
    case EDIT_BROTHERHOODS:
      return { ...state, brotherhoods: action.payload };
    case EDIT_GOOD_STANDING:
      return { ...state, goodStanding: action.payload };
    case EDIT_ADMIN:
      return { ...state, admin: action.payload };
    case SAVE_NEW_STATS:
      return { ...state, loading: true };
    case SAVE_NEW_STATS_SUCCESS:
      return INITIAL_STATE;
    case SAVE_NEW_STATS_FAILED:
      return { ...state, loading: false };
    case UPLOAD_IMAGE:
      return { ...state, loading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return { ...state, loading: false, image: action.payload };
    default:
      return state;
  }
};
