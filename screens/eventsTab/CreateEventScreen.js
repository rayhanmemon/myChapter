import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, View, Button, Text, Form, Input, Item } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {
  hideDatePicker,
  showDatePicker,
  showStartTimePicker,
  hideStartTimePicker,
  showEndTimePicker,
  hideEndTimePicker,
  eventNameChanged,
  eventDescriptionChanged,
  setEventDate,
  setStartTime,
  setEndTime,
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
    const dateString = '2019-01-21';
    this.props.setEventDate(dateString);
    this.props.hideDatePicker();
  };

  handleStartTimePicked = (startTime) => {
    console.log('Start Time: ', startTime);
    const startTimeString = '7:00 PM';
    this.props.setStartTime(startTimeString);
    this.props.hideStartTimePicker();
  };

  handleEndTimePicked = (endTime) => {
    console.log('End Time: ', endTime);
    const endTimeString = '11:59 PM';
    this.props.setEndTime(endTimeString);
    this.props.hideEndTimePicker();
  };

  render() {
    return (
      <Container>
        <Content>
          <Form style={styles.form}>
            <Text style={styles.label}>Event Name</Text>
            <Item style={{ marginBottom: 10 }}>
              <Input
                onChangeText={this.props.eventNameChanged.bind(this)}
                value={this.props.eventName}
              />
            </Item>
            <Text style={styles.label}>Event Description</Text>
            <Item style={{ marginBottom: 10 }}>
              <Input
              onChangeText={this.props.eventDescriptionChanged.bind(this)}
              value={this.props.eventDescription}
              />
            </Item>
            <Text style={styles.label}>Event Date</Text>
            <Item style={{ marginBottom: 10 }}>
              <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                <Button
                  transparent
                  danger
                  onPress={() => this.props.showDatePicker()}
                >
                 <Text>Select Date</Text>
                </Button>
                <DateTimePicker
                  isVisible={this.props.isDatePickerVisible}
                  onConfirm={(date) => this.handleDatePicked(date)}
                  onCancel={() => this.props.hideDatePicker()}
                />
              </View>
            </Item>
            <Text style={styles.label}>Event Time</Text>
            <Item style={{ marginBottom: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                <View>
                  <Button
                    transparent
                    danger
                    onPress={() => this.props.showStartTimePicker()}
                  >
                    <Text>Select Start Time</Text>
                  </Button>
                  <DateTimePicker
                    mode='time'
                    is24Hour={false}
                    isVisible={this.props.isStartTimePickerVisible}
                    onConfirm={(startTime) => this.handleStartTimePicked(startTime)}
                    onCancel={() => this.props.hideStartTimePicker()}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text> - </Text>
                </View>
                <View>
                  <Button
                    transparent
                    danger
                    onPress={() => this.props.showEndTimePicker()}
                  >
                    <Text>Select End Time</Text>
                  </Button>
                  <DateTimePicker
                    mode='time'
                    is24Hour={false}
                    isVisible={this.props.isEndTimePickerVisible}
                    onConfirm={(endTime) => this.handleEndTimePicked(endTime)}
                    onCancel={() => this.props.hideEndTimePicker()}
                  />
                </View>
              </View>
            </Item>
          </Form>
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
    fontWeight: 'bold',
    marginLeft: 15
  }
};

const mapStateToProps = (state) => {
  const { organization, rank, admin, firstName, lastName } = state.auth;
  const {
    isDatePickerVisible,
    isStartTimePickerVisible,
    isEndTimePickerVisible,
    eventName,
    eventDescription,
    eventDate,
    startTime,
    endTime,
    latitude,
    longitude
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
    eventName,
    eventDescription,
    eventDate,
    startTime,
    endTime,
    latitude,
    longitude
  });
};

export default connect(mapStateToProps, {
  hideDatePicker,
  showDatePicker,
  showStartTimePicker,
  hideStartTimePicker,
  showEndTimePicker,
  hideEndTimePicker,
  eventNameChanged,
  eventDescriptionChanged,
  setEventDate,
  setStartTime,
  setEndTime,
})(CreateEventScreen);
