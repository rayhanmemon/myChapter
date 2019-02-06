//AuthReducer Types
export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const LOGIN_USER = 'login_user';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGIN_USER_FAIL = 'login_user_fail';
export const RESET_AUTH_STATE = 'reset_auth_state';
export const FETCH_USERS_STATS = 'fetch_users_stats';
export const FETCH_USERS_STATS_SUCCESS = 'fetch_user_stats_success';
export const FETCH_ORG_AND_RANK = 'fetch_org_and_rank';
export const FETCH_ORG_AND_RANK_SUCCESS = 'fetch_org_and_rank_success';
export const LOGOUT_USER = 'logout_user';
//RegReducer Types
export const REG_CHAPTER_CHANGED = 'reg_chapter_changed';
export const REG_CODE_CHANGED = 'reg_code_changed';
export const REG_EMAIL_CHANGED = 'reg_email_changed';
export const REG_PASSWORD_CHANGED = 'reg_password_changed';
export const REG_FIRST_NAME_CHANGED = 'reg_first_name_changed';
export const REG_LAST_NAME_CHANGED = 'reg_last_name_changed';
export const REG_RANK_CHANGED = 'reg_rank_changed';
export const REG_POSITION_CHANGED = 'reg_position_changed';
export const REGISTRATION = 'registration';
export const REGISTRATION_SUCCESS = 'registration_success';
export const REGISTRATION_FAIL = 'registration_fail';
export const RESET_REGISTER_STATE = 'reset_register_state';
export const FETCH_ORGANIZATIONS = 'fetch_organizations';
export const FETCH_ORGANIZATIONS_SUCCESS = 'fetch_organizations_success';
export const FETCH_ORGANIZATIONS_FAILED = 'fetch_organizations_failed';
//ActivesReducer Types
export const REQUEST_LIST_DATA = 'request_list_data';
export const REQUEST_LIST_DATA_SUCCESS = 'request_list_data_success';
export const REQUEST_LIST_DATA_FAILED = 'request_list_data_failed';
export const FETCH_STATS = 'fetch_stats';
export const FETCH_STATS_SUCCESS = 'fetch_state_success';
export const SELECT_ACTIVE_BY_RANK = 'select_active_by_rank';
export const FETCH_SELECTED_PROFILE = 'fetch_selected_profile';
export const FETCH_SELECTED_PROFILE_SUCCESS = 'fetch_selected_profile_success';
//FeedReducer Types
export const POST_CHANGED = 'post_changed';
export const SEND_BUTTON_PRESSED = 'send_button_pressed';
export const POST_SUCCESS = 'post_success';
export const REQUEST_FEED_DATA = 'request_feed_data';
export const REQUEST_FEED_DATA_SUCCESS = 'request_feed_data_success';
export const DELETE_POST_ATTEMPTED = 'delete_post_attempted';
export const DELETE_POST_SUCCESS = 'delete_post_success';
export const SHOW_COMMENTS_ATTEMPTED = 'show_comments_attempted';
export const SHOW_COMMENTS_SUCCESS = 'show_comments_success';
export const COMMENT_CHANGED = 'comment_changed';
export const COMMENT_ATTEMPTED = 'comment_attempted';
export const COMMENT_SUCCESS = 'comment_success';
export const SELECT_FOR_COMMENTING = 'select_for_commenting';
export const CANCEL_COMMENTING = 'cancel_commenting';
export const HIDE_COMMENTS = 'hide_comments';
export const DELETE_COMMENT_ATTEMPTED = 'delete_comment_attempted';
export const DELETE_COMMENT_SUCCESS = 'delete_comment_success';
//SelectedProfileReducer Types
export const UPLOAD_IMAGE = 'upload_image';
export const UPLOAD_IMAGE_SUCCESS = 'upload_image_success';
export const INITIALIZE_TOTALS = 'initialize_totals';
export const TOGGLE_ADMIN_MODE = 'toggle_admin_mode';
export const EDIT_POSITION = 'edit_position';
export const EDIT_DUES = 'edit_dues';
export const EDIT_COMMUNITYSERVICE = 'edit_community_service';
export const EDIT_CHAPTERS = 'edit_chapters';
export const EDIT_MIXERS = 'edit_mixers';
export const EDIT_BROTHERHOODS = 'edit_brotherhoods';
export const SAVE_NEW_STATS = 'save_new_stats';
export const SAVE_NEW_STATS_SUCCESS = 'save_new_stats_success';
export const SAVE_NEW_STATS_FAILED = 'save_new_stats_failed';
export const EDIT_GOOD_STANDING = 'edit_good_standing';
export const EDIT_ADMIN = 'edit_admin';
export const SET_INITIAL_VALUES = 'set_initial_values';
export const INITIALIZE_STANDING_AND_PRIVELEGES = 'initialize_standing_and_priveleges';
//EventsReducer Types
export const REQUEST_EVENTS_LIST_DATA = 'request_events_list_data';
export const REQUEST_EVENTS_LIST_DATA_SUCCESS = 'request_events_list_data_success';
export const REQUEST_EVENTS_LIST_DATA_FAILED = 'request_events_list_data_failed';
export const CHECK_IN_ATTEMPTED = 'check_in_attempted';
export const GET_CURRENT_LOCATION_SUCCESS = 'get_current_location_success';
export const GET_CURRENT_LOCATION_FAILED = 'get_current_location_failed';
export const FETCH_EVENTS_ATTENDED = 'fetch_events_attended';
export const FETCH_EVENTS_ATTENDED_SUCCESS = 'fetch_events_attended_success';
export const CHECK_IN_SUCCESS = 'check_in_success';
export const EXPAND_SELECTED_EVENT = 'expand_selected_event';
export const COLLAPSE_SELECTED_EVENT = 'collapse_selected_event';
export const GET_CURRENT_DATE_AND_TIME_SUCCESS = 'get_current_date_and_time_success';
export const DELETE_EVENT_ATTEMPT = 'delete_event_attempt';
export const DELETE_EVENT_SUCCESS = 'delete_event_success';
export const REFRESH_EVENTS_SCREEN = 'refresh_events_screen';
//CreateEventReducer Types
export const CREATE_EVENT_ATTEMPT = 'create_event_attempt';
export const SHOW_DATE_PICKER = 'show_date_picker';
export const HIDE_DATE_PICKER = 'hide_date_picker';
export const SHOW_START_TIME_PICKER = 'show_start_time_picker';
export const HIDE_START_TIME_PICKER = 'hide_start_time_picker';
export const SHOW_END_TIME_PICKER = 'show_end_time_picker';
export const HIDE_END_TIME_PICKER = 'hide_end_time_picker';
export const EVENT_NAME_CHANGED = 'event_name_changed';
export const EVENT_DESCRIPTION_CHANGED = 'event_description_changed';
export const SET_EVENT_DATE = 'set_event_date';
export const SET_START_TIME = 'set_start_time';
export const SET_END_TIME = 'set_end_time';
export const LATITUDE_CHANGED = 'latitude_changed';
export const LONGITUDE_CHANGED = 'longitude_changed';
export const SET_EVENT_TYPE = 'set_event_type';
export const LOCATION_NAME_CHANGED = 'location_name_changed';
export const CREATE_EVENT_SUCCESS = 'create_event_success';
export const CREATE_EVENT_ERROR = 'create_event_error';
//SettingsReducer Types
export const FETCH_ADMIN_SETTINGS = 'fetch_admin_settings';
export const FETCH_ADMIN_SETTINGS_SUCCESS = 'fetch_admin_settings_success';
export const GENERATE_NEW_CODE_ATTEMPT = 'generate_new_code_attempt';
export const GENERATE_NEW_CODE_SUCCESS = 'generate_new_code_success';
export const SAVE_NEW_THRESHOLD_ATTEMPT = 'save_new_threshold_attempt';
export const SAVE_NEW_THRESHOLD_SUCCESS = 'save_new_threshold_success';
export const NEW_THRESHOLD_CHANGED = 'new_threshold_changed';
export const LOGOUT_USER_FAILED = 'logout_user_failed';
