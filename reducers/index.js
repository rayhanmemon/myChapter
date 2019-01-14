import { combineReducers } from 'redux';

import LoginReducer from './LoginReducer';
import RegReducer from './RegReducer';
import ActivesReducer from './ActivesReducer';
import FeedReducer from './FeedReducer';
import EventsReducer from './EventsReducer';
import SelectedProfileReducer from './SelectedProfileReducer';
import CreateEventReducer from './CreateEventReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  auth: LoginReducer,
  register: RegReducer,
  actives: ActivesReducer,
  feed: FeedReducer,
  events: EventsReducer,
  createEvent: CreateEventReducer,
  selectedProfile: SelectedProfileReducer,
  settings: SettingsReducer
});
