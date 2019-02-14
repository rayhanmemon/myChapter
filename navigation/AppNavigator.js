import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterChapterScreen from '../screens/auth/RegisterChapterScreen';
import JoinChapterScreen from '../screens/auth/JoinChapterScreen';
import SelectOrganizationScreen from '../screens/auth/SelectOrganizationScreen';
import ChooseRoleScreen from '../screens/auth/ChooseRoleScreen';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    RegChapter: RegisterChapterScreen,
    SelectOrg: SelectOrganizationScreen,
    ChooseRole: ChooseRoleScreen,
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
