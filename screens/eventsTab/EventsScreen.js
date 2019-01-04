import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Content, List, Card, CardItem, Spinner, Text, Body, Left, Right, Button } from 'native-base';

import {
  fetchEventsList,
  fetchSelectedEvent,
  checkInAttempt,
  getCurrentLocationAndDate,
  didUserAttend,
  toggleAttendeeList
} from '../../actions';

class EventsScreen extends Component {
  static navigationOptions = {
    title: 'Events',
    headerStyle: {
      backgroundColor: '#ff0000',
    },
    headerTintColor: '#fff'
  };

  componentWillMount() {
    this.props.fetchEventsList(this.props.organization, this.props.rank);
    this.props.getCurrentLocationAndDate();
  }

  renderCheckInButton(event) {
    const {
      organization,
      rank,
      eventLoading,
      currentLatitude,
      currentLongitude,
      eventsAttended,
      firstName,
      lastName,
    } = this.props;

    const { eventKey, latitude, longitude, title, type } = event;

    let i = 0;
    let didAttend = false;
    const lengthOfArray = eventsAttended.length;

    for (i = 0; i < lengthOfArray; i++) {
      if (eventKey === eventsAttended[i].eventKey) {
        didAttend = true;
        break;
      }
   }

    const deltaLatitude = Math.abs(currentLatitude - latitude);
    const deltaLongitude = Math.abs(currentLongitude - longitude);

    if (didAttend) {
      return (
        <Button
         full
         success
         style={{ margin: 10 }}
        >
         <Text>ATTENDED</Text>
        </Button>
      );
    } else if (eventLoading === eventKey) {
      return <Spinner />;
    } else if (deltaLatitude > 0.0009 && deltaLongitude > 0.0009) {
      return (
        <Button
         full
         light
         style={{ margin: 10 }}
        >
         <Text>OUT OF RANGE</Text>
        </Button>
      );
    } return (
      <Button
       full
       danger
       style={{ margin: 10 }}
       onPress={() => this.props.checkInAttempt(firstName, lastName, organization, rank, eventKey, title, type)}
      >
       <Text>CHECK IN</Text>
      </Button>
    );
  }

  renderAttendeesButton(event) {
    const { eventKey } = event;
    const { selectedAttendeesList } = this.props;
    const isExpanded = (selectedAttendeesList === eventKey);

    const attendanceData = _.map(event.attendees, (val, key) => {
      return { ...val, key };
    });

    if (isExpanded) {
      return (
        <View>
         <Button
           transparent
           info
           onPress={() => this.props.toggleAttendeeList(isExpanded, eventKey)}
         >
          <Text style={{ fontSize: 15 }}>Hide Attendees</Text>
         </Button>
         <List
           enableEmptySections
           dataArray={attendanceData}
           renderRow={this.renderAttendeeRow}
         />
        </View>
       );
    }
    return (
       <Button
         transparent
         info
         onPress={() => this.props.toggleAttendeeList(isExpanded, eventKey)}
       >
        <Text style={{ fontSize: 15 }}>Show Attendees</Text>
       </Button>
     );
  }

  renderAttendeeRow = (attendee) => {
    return (
      <CardItem style={{ marginLeft: 5 }}>
        <Left>
          <Text>{attendee.name}</Text>
        </Left>
        <Right>
          <Text>{attendee.time}</Text>
        </Right>
      </CardItem>
    );
  }

  renderEventsList = () => {
    const listKey = `${this.props.loadingList}${this.props.selectedAttendeesList}`;

    if (this.props.loadingList) {
      return <Spinner />;
    } else if (this.props.error) {
      return (<Text>{this.props.error}</Text>);
    } return (
      <List
        key={listKey}
        enableEmptySections
        dataArray={this.props.listData}
        renderRow={this.renderEventRow}
      />
    );
  }

  renderEventRow = (event) => {
    return (
      <Card>
       <CardItem>
         <Left>
          <Body>
             <Text style={{ marginTop: 5, fontWeight: 'bold' }}>{event.title}</Text>
             <Text note style={{ fontSize: 15 }}>{event.type}</Text>
          </Body>
         </Left>
         <Right>
          <Text>{event.date}</Text>
         </Right>
       </CardItem>
       <CardItem>
       <Left>
        <Body>
          <Text style={{ fontSize: 14, marginBottom: 2 }}>Time: {event.startTime} - {event.endTime}</Text>
          <Text style={{ fontSize: 14 }}>Location: {event.locationName}</Text>
        </Body>
       </Left>
       </CardItem>
       <CardItem style={{ marginLeft: 5 }}>
          <Text>{event.description}</Text>
       </CardItem>
       {this.renderAttendeesButton(event)}
       {this.renderCheckInButton(event)}
     </Card>
    );
  }

  render() {
    if (this.props.currentLatitude === 0) {
      return <Spinner />;
    } else if (this.props.admin) {
      return (
        <Container>
          <Content>
            <Button
              transparent
              danger
              onPress={() => this.props.navigation.navigate('CreateEvent')}
            >
              <Text>Create New Event</Text>
            </Button>
            {this.renderEventsList()}
          </Content>
        </Container>
      );
    } return (
      <Container>
        <Content>
          {this.renderEventsList()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { organization, rank, admin, firstName, lastName } = state.auth;
  const {
    loadingList,
    loadingEvent,
    error,
    listData,
    eventLoading,
    currentLatitude,
    currentLongitude,
    eventsAttended,
    selectedAttendeesList
  } = state.events;

  return ({
    loadingList,
    loadingEvent,
    error,
    listData,
    organization,
    rank,
    admin,
    eventLoading,
    currentLatitude,
    currentLongitude,
    eventsAttended,
    firstName,
    lastName,
    selectedAttendeesList
  });
};

export default connect(mapStateToProps, {
  fetchEventsList,
  fetchSelectedEvent,
  checkInAttempt,
  getCurrentLocationAndDate,
  didUserAttend,
  toggleAttendeeList
})(EventsScreen);
