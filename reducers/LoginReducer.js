import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  RESET_AUTH_STATE,
  FETCH_ORG_AND_RANK,
  FETCH_ORG_AND_RANK_SUCCESS,
  LOGOUT_USER,
  FETCH_USERS_STATS_SUCCESS
} from '../constants/Types';

const INITIAL_STATE = {
  email: '',
  password: '',
  uid: '',
  //profile data
  admin: false,
  brotherhoods: 0,
  chapters: 0,
  communityService: 0,
  dues: 0,
  firstName: '',
  lastName: '',
  mixers: 0,
  position: '',
  organization: '',
  rank: '',
  goodStanding: true,
  //end of profile info
  loadingSignIn: false,
  loadingOrgAndRank: false,
  error: '',
  loggedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS_STATS_SUCCESS:
      return {
        ...state,
        error: '',
        loadingList: false,
        admin: action.payload.admin,
        brotherhoods: action.payload.brotherhoods,
        chapters: action.payload.chapters,
        communityService: action.payload.communityService,
        dues: action.payload.dues,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        mixers: action.payload.mixers,
        position: action.payload.position,
        goodStanding: action.payload.goodStanding
      };
    case LOGOUT_USER:
      return { INITIAL_STATE };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loadingSignIn: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, uid: action.payload, loadingSignIn: false, loadingOrgAndRank: true, error: '' };
    case LOGIN_USER_FAIL:
      return { ...state, loadingSignIn: false, error: 'Authentication Failed' };
      case FETCH_ORG_AND_RANK:
        return { ...state, loadingOrgAndRank: true };
      case FETCH_ORG_AND_RANK_SUCCESS:
        return { ...state, loadingOrgAndRank: false, organization: action.payload.organization, rank: action.payload.rank, loggedIn: true };
    case RESET_AUTH_STATE:
      return { ...state, email: '', password: '', loadingSignIn: false, loadingOrgAndRank: false, loadingUserProfile: false, error: '' };
    default:
      return state;
  }
};
