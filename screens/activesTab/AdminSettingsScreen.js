import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Content } from 'native-base';

class AdminSettingsScreen extends Component {
  static navigationOptions = {
    title: 'Administrator Settings',
    headerStyle: {
      backgroundColor: '#ff0000',
    },
    headerTintColor: '#fff'
  };

  render() {
    return (
      <Container />
    );
  }
}

const mapStateToProps = (state) => {
  const { organization, rank, firstName, lastName } = state.auth;
  return ({ organization, rank, firstName, lastName });
};

export default connect(mapStateToProps, { })(AdminSettingsScreen);
