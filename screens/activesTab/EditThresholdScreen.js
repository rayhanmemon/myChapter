import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Text, Button, View, Spinner, Input } from 'native-base';

import { generateSecurityCode, newThresholdChanged, saveNewThreshold } from '../../actions';

class EditThresholdScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.title}`,
      headerStyle: {
        backgroundColor: '#ff0000',
      },
      headerTintColor: '#fff'
    };
  };

  renderSaveButton(value, newThreshold) {
    if (this.props.saving) {
      return <Spinner />;
    } if (value === 'securityCode') {
      return (
        <Button
          danger
          full
          onPress={() => this.props.generateSecurityCode(this.props.organization)}
        >
          <Text>Generate New Security Code</Text>
        </Button>
      );
    } return (
      <Button
        danger
        full
        onPress={() => this.props.saveNewThreshold(this.props.organization, value, newThreshold)}
      >
        <Text>Save New Threshold</Text>
      </Button>
    );
  }

  renderEditInput(value, currentValue) {
    if (value === 'securityCode') {
      return (
        <View style={{ margin: 20 }}>
          <Text style={{ marginBottom: 10 }}>
            Provide this code to members of your organization so they may register
            as part of your organization or reset their password.
          </Text>
          <Text style={{ marginBottom: 30 }}>
            If your security code is comprimised, you may generate a new one.
            Your current security code is:
          </Text>
          <Text style={{ marginBottom: 30, fontSize: 20, alignSelf: 'center' }}>
            {this.props.securityCode}
          </Text>
          {this.renderSaveButton(value)}
        </View>
      );
    } if (value !== '') {
      return (
        <View style={{ margin: 20 }}>
          <Text style={{ marginBottom: 20 }}>
            The current threshold for this statistic is:
          </Text>
          <Text style={{ marginBottom: 20, fontSize: 30, alignSelf: 'center' }}>
            {currentValue}
          </Text>
          <Input
            style={styles.editThreshold}
            placeholder='New Threshold Value'
            onChangeText={this.props.newThresholdChanged.bind(this)}
          />
          {this.renderSaveButton(value, this.props.newThreshold)}
        </View>
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const value = navigation.getParam('value', '');
    const currentValue = navigation.getParam('currentValue', '');
    return (
      <Container>
        <Content>
          {this.renderEditInput(value, currentValue)}
        </Content>
      </Container>
    );
  }
}

const styles = {
  editThreshold: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dddddd',
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    marginBottom: 15
  },
};

const mapStateToProps = (state) => {
  const { organization, rank, admin } = state.auth;
  const { saving, securityCode, newThreshold } = state.settings;
  return {
    organization, rank, admin, saving, securityCode, newThreshold
  };
};

export default connect(mapStateToProps, {
  generateSecurityCode,
  newThresholdChanged,
  saveNewThreshold
})(EditThresholdScreen);
