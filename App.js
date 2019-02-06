import React from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { Platform, StatusBar, View, ActivityIndicator } from 'react-native';
import { AppLoading, Font, Icon } from 'expo';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './navigation/AppNavigator';

import { store, persistor } from './Store';

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAkg5srusAbMhyajhVDi_ECnWV4x6kEy_Q',
      authDomain: 'mychapter-56a86.firebaseapp.com',
      databaseURL: 'https://mychapter-56a86.firebaseio.com',
      projectId: 'mychapter-56a86',
      storageBucket: 'mychapter-56a86.appspot.com',
      messagingSenderId: '264743273376'
    });
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font
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
