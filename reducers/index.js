import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import LoginReducer from './LoginReducer';
import RegReducer from './RegReducer';
import ActivesReducer from './ActivesReducer';
import FeedReducer from './FeedReducer';
import EventsReducer from './EventsReducer';
import SelectedProfileReducer from './SelectedProfileReducer';
import CreateEventReducer from './CreateEventReducer';
import SettingsReducer from './SettingsReducer';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['organization', 'rank', 'loggedIn']
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, LoginReducer),
  register: RegReducer,
  actives: ActivesReducer,
  feed: FeedReducer,
  events: EventsReducer,
  createEvent: CreateEventReducer,
  selectedProfile: SelectedProfileReducer,
  settings: SettingsReducer
});
