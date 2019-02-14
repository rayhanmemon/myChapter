import React, { Component } from 'react';
import { Container, Content, Button, Text, Body } from 'native-base';

class ChooseRoleScreen extends Component {
  static navigationOptions = {
    title: 'Choose Role',
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Body style={styles.buttonContainer}>
            <Button
              style={styles.button}
              transparent primary
              onPress={() => this.props.navigation.navigate('joinChapter')}
            >
              <Text style={styles.text}>Active Member</Text>
            </Button>
            <Button
              style={styles.button}
              transparent danger
              onPress={() => this.props.navigation.navigate('joinChapter')}
            >
              <Text style={styles.text}>Alumnus Observer</Text>
            </Button>
          </Body>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 50,
    justifyContent: 'center'
  },
  button: {
    alignSelf: 'center',
    marginTop: 30
  },
  text: {
    fontSize: 30
  }
};

export default ChooseRoleScreen;
