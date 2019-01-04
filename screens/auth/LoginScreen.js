import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text, Spinner, Body } from 'native-base';

import { emailChanged, passwordChanged, loginUser, resetAuthState, fetchUsersOrgAndRank, fetchUsersStats } from '../../actions';

class LoginScreen extends Component {

  static navigationOptions = {
    title: 'Sign In',
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.loggedIn) {
      this.props.resetAuthState();
      nextProps.navigation.navigate('Main');
      return false;
    } return true;
  }

  onEmailChange = (text) => {
    this.props.emailChanged(text);
  }
  onPasswordChange = (text) => {
    this.props.passwordChanged(text);
  }
  onSignInButtonPress = () => {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }
  renderError = () => {
    if (this.props.error) {
      return (
        <Text style={styles.error}>{this.props.error}</Text>
      );
    } return;
  }
  renderSignInButton = () => {
    if (this.props.loadingSignIn) {
      return <Spinner color='red' />;
    } else if (this.props.loadingOrgAndRank) {
      this.props.fetchUsersOrgAndRank();
      return <Spinner color='orange' />;
    } else if (this.props.loadingUserProfile) {
      const { organization, rank } = this.props;
      this.props.fetchUsersStats(organization, rank);
      return <Spinner />;
    } return (
      <Button
        block danger
        style={styles.signInButton}
        onPress={this.onSignInButtonPress.bind(this)}
      >
        <Text>SIGN IN</Text>
      </Button>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.title}>myChapter.</Text>
          <Form style={styles.form}>
          <Item>
            <Input
              placeholder="Email"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
           </Item>
           <Item>
             <Input
               placeholder="Password"
               secureTextEntry
               onChangeText={this.onPasswordChange.bind(this)}
               value={this.props.password}
             />
           </Item>
          </Form>
          {this.renderError()}
          {this.renderSignInButton()}
          <Body style={styles.registerButton}>
            <Button
              transparent primary
              onPress={() => this.props.navigation.navigate('RegChapter')}
            >
              <Text style={styles.registerText}>Start a New Chapter</Text>
            </Button>
            <Button
              transparent primary
              onPress={() => this.props.navigation.navigate('joinChapter')}
            >
              <Text style={styles.registerText}>Join Existing Chapter</Text>
            </Button>
          </Body>
        </Content>
      </Container>
    );
  }
}

const styles = {
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#EA2027',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 40
  },
  container: {
      flex: 1,
      padding: 10
    },
    form: {
      marginBottom: 20
    },
    signInButton: {
    },
    registerButton: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    registerText: {
      fontSize: 15
    },
    error: {
      fontSize: 15,
      color: '#EA2027',
      marginBottom: 15,
      textAlign: 'center'
    }
};

const mapStateToProps = (state) => {
  const { email, password, loadingSignIn, loadingOrgAndRank, loadingUserProfile, error, loggedIn, organization, rank } = state.auth;
  return (
    { email, password, loadingSignIn, loadingOrgAndRank, loadingUserProfile, error, loggedIn, organization, rank }
  );
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, resetAuthState, fetchUsersOrgAndRank, fetchUsersStats })(LoginScreen);
