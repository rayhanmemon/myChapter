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
  toggleAttendeeList,
  deleteEvent,
  refreshEventScreen
} from '../../actions';

class EventsScreen extends Component {
  static navigationOptions = {
    title: 'Events',
    headerStyle: {
      backgroundColor: '#ff0000',
    },
    headerTintColor: '#fff'
  };

    componentDidMount() {
      this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.willFocus);
    }

    componentWillUnmount() {
      if (this.willFocusSubscription) {
        this.willFocusSubscription.remove();
      }
    }

    willFocus = () => {
      this.props.refreshEventScreen(this.props.refreshKey);
      this.props.fetchEventsList(this.props.organization, this.props.rank);
      this.props.getCurrentLocationAndDate();
    }

  jsCoreDateCreator(dateString) {
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
    const dateParam = dateString.split(/[\s-:]/);
    dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
    return new Date(...dateParam);
  }

  renderDeleteEventButton(event) {
    const { organization } = this.props;
    const { eventKey } = event;

    const attendees = _.map(event.attendees, (val) => {
      return val.rank;
    });

    if (this.props.eventToDelete === eventKey) {
      return <Spinner />;
    } else if (this.props.admin) {
      return (
        <Button
          transparent
          danger
          onPress={() => this.props.deleteEvent(organization, eventKey, attendees)}
        >
          <Text>Delete</Text>
        </Button>
      );
    } return;
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
      currentDate,
    } = this.props;

    const { eventKey, latitude, longitude, title, type, day, month, year, startTime, endTime } = event;

    let i = 0;
    let didAttend = false;
    const lengthOfArray = eventsAttended.length;

    for (i = 0; i < lengthOfArray; i++) {
      if (eventKey === eventsAttended[i].eventKey) {
        didAttend = true;
        break;
      }
   }

   /*Check for distance from check-in location*/
    const deltaLatitude = Math.abs(currentLatitude - latitude);
    const deltaLongitude = Math.abs(currentLongitude - longitude);
    const inRange = (deltaLatitude < 0.0009 && deltaLongitude < 0.0009);

    /*Create Dates for StartTime, EndTime, & CheckInTime*/
    const startTimeHours = parseInt(startTime.substring(0, 2), 10);
    const startTimeMinutes = parseInt(startTime.substring(3, 5), 10);
    const startDateString = `${year}-${month}-${day} ${startTimeHours}:${startTimeMinutes}:00`;
    const startTimeDate = this.jsCoreDateCreator(startDateString);

    let checkInDateString = `${year}-${month}-${day} ${startTimeHours - 1}:${startTimeMinutes}:00`;
    if (startTimeHours === 0) {
      checkInDateString = `${year}-${month}-${day - 1} ${23}:${startTimeMinutes}:00`;
    }
    const checkInDate = this.jsCoreDateCreator(checkInDateString);

    const endTimeHours = parseInt(endTime.substring(0, 2), 10);
    const endTimeMinutes = parseInt(endTime.substring(3, 5), 10);
    let endDateString = endDateString = `${year}-${month}-${day + 1} ${endTimeHours}:${endTimeMinutes}:00`;
    if (startTimeHours <= endTimeHours) {
      endDateString = `${year}-${month}-${day} ${endTimeHours}:${endTimeMinutes}:00`;
    }
    const endTimeDate = this.jsCoreDateCreator(endDateString);

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
    } else if (currentDate > endTimeDate) {
      return (
        <Button
         full
         danger
         style={{ margin: 10 }}
        >
         <Text>MISSED</Text>
        </Button>
      );
    } else if (currentDate < checkInDate) {
      return (
        <Button
         full
         light
         style={{ margin: 10 }}
        >
         <Text>TOO EARLY TO CHECK-IN</Text>
        </Button>
      );
    } else if (inRange && (currentDate > startTimeDate)) {
      return (
        <Button
         full
         info
         style={{ margin: 10 }}
         onPress={() => this.props.checkInAttempt(firstName, lastName, organization, rank, eventKey, title, type)}
        >
         <Text>CHECK IN</Text>
        </Button>
      );
    } else if (inRange) {
        return (
        <Button
         full
         info
         style={{ margin: 10 }}
         onPress={() => this.props.checkInAttempt(firstName, lastName, organization, rank, eventKey, title, type)}
        >
         <Text>CHECK IN EARLY</Text>
        </Button>
      );
    } return (
    <Button
     full
     warning
     style={{ margin: 10 }}
    >
     <Text>OUT OF RANGE</Text>
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
           removeClippedSubviews={false}
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
            {this.renderDeleteEventButton(event)}
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
        <Container key={this.props.refreshKey}>
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
    selectedAttendeesList,
    currentDate,
    eventToDelete,
    refreshKey
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
    selectedAttendeesList,
    currentDate,
    eventToDelete,
    refreshKey
  });
};

export default connect(mapStateToProps, {
  fetchEventsList,
  fetchSelectedEvent,
  checkInAttempt,
  getCurrentLocationAndDate,
  didUserAttend,
  toggleAttendeeList,
  deleteEvent,
  refreshEventScreen
})(EventsScreen);
