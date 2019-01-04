import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterChapterScreen from '../screens/auth/RegisterChapterScreen';
import JoinChapterScreen from '../screens/auth/JoinChapterScreen';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    RegChapter: RegisterChapterScreen,
    joinChapter: JoinChapterScreen
  },
  {
    initialRouteName: 'Login'
  }
);

export default createSwitchNavigator(
  {
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Auth: AuthStack,
    Main: MainTabNavigator
  },
  {
    initialRouteName: 'Auth'
  }
);
