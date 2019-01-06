import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, View, Button, Text, Form, Input, Item, Picker, Icon, Spinner } from 'native-base';
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
  longitudeChanged,
  latitudeChanged,
  setEventType,
  createEvent,
  locationNameChanged
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
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const string = date.toString();
    const dateString = string.substring(0, 15);
    this.props.setEventDate(dateString, year, month, day);
    this.props.hideDatePicker();
  };

  handleStartTimePicked = (startTime) => {
    const string = startTime.toString();
    const startTimeString = string.substring(16, 21);
    this.props.setStartTime(startTimeString);
    this.props.hideStartTimePicker();
  };

  handleEndTimePicked = (endTime) => {
    const string = endTime.toString();
    const endTimeString = string.substring(16, 21);
    this.props.setEndTime(endTimeString);
    this.props.hideEndTimePicker();
  };

  renderButton() {
    const { organization, locationName, eventDate, year, month, day, loading, longitude, latitude, startTime, endTime, eventDescription, eventName, eventType } = this.props;
    if (loading) {
      return <Spinner />;
    } return (
      <Button
        style={{ margin: 20 }}
        full
        danger
        onPress={() => this.props.createEvent(organization, locationName, eventDate, year, month, day, longitude, latitude, startTime, endTime, eventDescription, eventName, eventType)}
      >
        <Text>CREATE EVENT</Text>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <Form style={styles.form}>
          <Text style={styles.label}>Event Type</Text>
          <Item picker style={{ marginBottom: 10 }}>
           <Picker
             mode="dropdown"
             style={{ width: undefined }}
             iosIcon={<Icon name="ios-arrow-down" />}
             placeholder='Select Event Type'
             placeholderStyle={{ color: 'red' }}
             selectedValue={this.props.eventType}
             onValueChange={this.props.setEventType.bind(this)}
           >
             <Picker.Item label="Chapter" value='chapter' />
             <Picker.Item label="Mixer" value='mixer' />
             <Picker.Item label="Brotherhood" value='brotherhood' />
             <Picker.Item label="Community Service" value='communityService' />
             <Picker.Item label="Other" value='' />
           </Picker>
          </Item>
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
                 <Text>{this.props.eventDate}</Text>
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
                    <Text>{this.props.startTime}</Text>
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
                    <Text>{this.props.endTime}</Text>
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
            <Text style={styles.label}>Event location</Text>
            <Item style={{ flex: 1, flexDirection: 'column', marginBottom: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, marginTop: 13 }}>Location Name: </Text>
                <Input
                  onChangeText={this.props.locationNameChanged.bind(this)}
                  value={this.props.locationName}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, marginTop: 13 }}>Latitude: </Text>
              <Input
                onChangeText={this.props.latitudeChanged.bind(this)}
                value={this.props.latitude}
              />
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, marginTop: 13 }}>Longitude: </Text>
                <Input
                  onChangeText={this.props.longitudeChanged.bind(this)}
                  value={this.props.longitude}
                />
              </View>
            </Item>
          </Form>
          <Text style={{ fontSize: 10, marginLeft: 20, marginRight: 15 }}>
            Note: Future updates will include a map system for selecting location.
            For now, please use google maps to determine your check-in point.
          </Text>
          {this.renderButton()}
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
    longitude,
    eventType,
    loading,
    locationName,
    year,
    month,
    day
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
    longitude,
    eventType,
    loading,
    locationName,
    year,
    month,
    day
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
  longitudeChanged,
  latitudeChanged,
  setEventType,
  createEvent,
  locationNameChanged
})(CreateEventScreen);
