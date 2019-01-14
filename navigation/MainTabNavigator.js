import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import FeedScreen from '../screens/feedTab/FeedScreen';

import EventsScreen from '../screens/eventsTab/EventsScreen';
import CreateEventScreen from '../screens/eventsTab/CreateEventScreen';

import ActivesScreen from '../screens/activesTab/ActivesScreen';
import ProfileScreen from '../screens/activesTab/ProfileScreen';
import SettingsScreen from '../screens/activesTab/SettingsScreen';
import EditThresholdScreen from '../screens/activesTab/EditThresholdScreen';

//Feed Tab Navigation Setup
const FeedStack = createStackNavigator({
  Feed: FeedScreen,
});

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'}
      color={tintColor}
    />
  ),
};

//Events Tab Navigation Setup
const EventsStack = createStackNavigator({
  EventsList: EventsScreen,
  CreateEvent: CreateEventScreen
});

EventsStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
      color={tintColor}
    />
  ),
};

//Actives Tab Navigation Setup
const ActivesStack = createStackNavigator({
  Actives: ActivesScreen,
  SelectedProfile: ProfileScreen,
  Settings: SettingsScreen,
  EditThreshold: EditThresholdScreen,
});

ActivesStack.navigationOptions = {
  tabBarLabel: 'Actives',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-contacts'}
      color={tintColor}
    />
  ),
};

export default createBottomTabNavigator(
  {
    ActivesStack,
    FeedStack,
    EventsStack,
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    }
  }
);
