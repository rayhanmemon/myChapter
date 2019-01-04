import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';


class SelectEventLocationScreen extends Component {
  static navigationOptions = {
    title: 'Select Event Location',
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
  const { organization, rank, admin, firstName, lastName } = state.auth;

  return ({
    organization,
    rank,
    admin,
    firstName,
    lastName
  });
};

export default connect(mapStateToProps)(SelectEventLocationScreen);
