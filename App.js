import React from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { Platform, StatusBar, View, ActivityIndicator } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './navigation/AppNavigator';

import { store, persistor } from './Store';

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDUdobtrbC3hfg3hJyZvTO2kxzO-PGJ0fM',
      authDomain: 'ksigapp.firebaseapp.com',
      databaseURL: 'https://ksigapp.firebaseio.com',
      projectId: 'ksigapp',
      storageBucket: 'ksigapp.appspot.com',
      messagingSenderId: '865998653247'
    });
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  renderLoading() {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
};
