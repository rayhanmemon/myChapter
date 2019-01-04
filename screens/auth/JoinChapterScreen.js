import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Container, Content, Form, Card, Item, Input, Text, Button, Spinner } from 'native-base';

import {
  regChapterChanged,
  regCodeChanged,
  regEmailChanged,
  regPasswordChanged,
  regFirstNameChanged,
  regLastNameChanged,
  regRankChanged,
  regPositionChanged,
  regUser,
  resetRegisterState
} from '../../actions';

class RegisterChapterScreen extends Component {
  static navigationOptions = {
    title: 'Join a Chapter',
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.registerSuccess) {
      nextProps.resetRegisterState();
      nextProps.navigation.navigate('Login');
      console.log('worked');
      return false;
    } return true;
  }

  onButtonPress = () => {
    const { organization, regCode, email, password, firstName, lastName, rank, position } = this.props;
    this.props.regUser(organization, regCode, email, password, firstName, lastName, rank, position);
  }
  renderError = () => {
    if (this.props.error) {
      return (
        <Text style={styles.error}>{this.props.error}</Text>
      );
    }
  }
  renderButton = () => {
    if (this.props.loading) {
      return (
        <Spinner />
      );
    }
    return (
      <Button
        block danger
        style={styles.button}
        onPress={this.onButtonPress.bind(this)}
      >
        <Text>JOIN CHAPTER</Text>
      </Button>
    );
  }

  render() {
    const { organization, regCode, email, password, firstName, lastName, rank, position } = this.props;

    return (
      <Container>
        <Content>
          <Card style={{ marginBottom: 10 }}>
            <Text style={styles.cardTitle}>Chapter Name</Text>
            <Form>
              <Item>
                <Input
                  placeholder="e.g Omicron-Pi"
                  onChangeText={this.props.regChapterChanged.bind(this)}
                  value={organization}
                />
              </Item>
              <Text style={styles.cardTitle}>Registration Code</Text>
              <Text style={styles.cardSubText}>provided by chapter admin</Text>
              <Item>
                <Input
                  placeholder="e.g Omicron-Pi-105517"
                  onChangeText={this.props.regCodeChanged.bind(this)}
                  value={regCode}
                />
              </Item>
            </Form>
          </Card>
          <Card>
            <Text style={styles.cardTitle}>Create Profile</Text>
            <Form>
              <Item>
                <Input
                  placeholder="Email"
                  onChangeText={this.props.regEmailChanged.bind(this)}
                  value={email}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Password"
                  onChangeText={this.props.regPasswordChanged.bind(this)}
                  value={password}
                  secureTextEntry
                />
              </Item>
            </Form>
            <Form>
              <Item>
                <Input
                  placeholder="First Name"
                  onChangeText={this.props.regFirstNameChanged.bind(this)}
                  value={firstName}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Last Name"
                  onChangeText={this.props.regLastNameChanged.bind(this)}
                  value={lastName}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Rank"
                  onChangeText={this.props.regRankChanged.bind(this)}
                  value={rank}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Position"
                  onChangeText={this.props.regPositionChanged.bind(this)}
                  value={position}
                />
              </Item>
            </Form>
          </Card>
          {this.renderError()}
          {this.renderButton()}
        </Content>
      </Container>
    );
  }
}

const styles = {
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 5
  },
  cardSubText: {
    paddingLeft: 20
  },
  button: {
    marginTop: 10
  },
  error: {
    fontSize: 15,
    color: '#EA2027',
    marginBottom: 15,
    textAlign: 'center'
  },
};

const mapStateToProps = (state) => {
  const { organization, regCode, email, password, firstName, lastName, rank, position, loading, error, registerSuccess } = state.register;
  return (
    { organization, regCode, email, password, firstName, lastName, rank, position, loading, error, registerSuccess }
  );
};

export default connect(mapStateToProps, {
  regChapterChanged,
  regEmailChanged,
  regPasswordChanged,
  regFirstNameChanged,
  regLastNameChanged,
  regRankChanged,
  regPositionChanged,
  regCodeChanged,
  regUser,
  resetRegisterState,
})(RegisterChapterScreen);
