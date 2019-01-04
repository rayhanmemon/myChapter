import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, View, Button, Text, Form, Input, Item } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
//import TimePicker from 'react-time-picker';

import {
  hideDatePicker,
  showDatePicker,
  showStartTimePicker,
  hideStartTimePicker,
  showEndTimePicker,
  hideEndTimePicker,
  setStartTime
} from '../../actions/CreateEventActions';

class CreateEventScreen extends Component {
  static navigationOptions = {
    title: 'Create Event',
    headerStyle: {
      backgroundColor: '#ff0000',
    },
    headerTintColor: '#fff'
  };

  handleDatePicked = (date) => {
    console.log('date: ', date);
    this.props.hideDatePicker();
  };

  handleStartTimePicked = (startTime) => {
    console.log('Start Time: ', startTime);
    this.props.hideStartTimePicker();
  };

  handleEndTimePicked = (endTime) => {
    console.log('End Time: ', endTime);
    this.props.hideEndTimePicker();
  };

  render() {
    return (
      <Container>
        <Content>
          <Form style={styles.form}>
            <Text style={styles.label}>Event Name</Text>
            <Item style={{ marginBottom: 10 }}>
              <Input />
            </Item>
            <Text style={styles.label}>Event Description</Text>
            <Item>
              <Input />
            </Item>
          </Form>
          <View style={{ flex: 1 }}>
            <Button onPress={() => this.props.showDatePicker()}>
              <Text>Event Date</Text>
            </Button>
            <DateTimePicker
              isVisible={this.props.isDatePickerVisible}
              onConfirm={(date) => this.handleDatePicked(date)}
              onCancel={() => this.props.hideDatePicker()}
            />
          </View>
          <View style={{ flex: 1 }}>
            {/*<TimePicker
              onChange={(time) => this.props.setStartTime(time)}
              value={this.startTime}
            />*/}
            <Button onPress={() => this.props.showStartTimePicker()}>
              <Text>Start Time</Text>
            </Button>
            <DateTimePicker
              mode='time'
              isVisible={this.props.isStartTimePickerVisible}
              onConfirm={(startTime) => this.handleStartTimePicked(startTime)}
              onCancel={() => this.props.hideStartTimePicker()}
            />*/}
          </View>
          <View>
            <Button onPress={() => this.props.showEndTimePicker()}>
              <Text>End Time</Text>
            </Button>
            <DateTimePicker
              mode='time'
              isVisible={this.props.isEndTimePickerVisible}
              onConfirm={(endTime) => this.handleEndTimePicked(endTime)}
              onCancel={() => this.props.hideEndTimePicker()}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  form: {
    margin: 15
  },
  label: {
    fontWeight: 'bold'
  }
};

const mapStateToProps = (state) => {
  const { organization, rank, admin, firstName, lastName } = state.auth;
  const {
    isDatePickerVisible,
    isStartTimePickerVisible,
    isEndTimePickerVisible,
    startTime
  } = state.createEvent;
  return ({
    organization,
    rank,
    admin,
    firstName,
    lastName,
    isDatePickerVisible,
    isStartTimePickerVisible,
    isEndTimePickerVisible,
    startTime
  });
};

export default connect(mapStateToProps, {
  hideDatePicker,
  showDatePicker,
  showStartTimePicker,
  hideStartTimePicker,
  showEndTimePicker,
  hideEndTimePicker,
  setStartTime
})(CreateEventScreen);
