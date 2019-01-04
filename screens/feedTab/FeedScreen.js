import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, Card, CardItem, Thumbnail, Body, Text, Left, Button, Input, Spinner } from 'native-base';

import { postChanged, sendButtonPressed, fetchFeed } from '../../actions';

class FeedScreen extends Component {
  static navigationOptions = {
    title: 'Announcements',
    headerStyle: {
      backgroundColor: '#ff0000',
    },
    headerTintColor: '#fff'
  };

  componentWillMount() {
    this.props.fetchFeed(this.props.organization);
  }

  onSendButtonPress = () => {
    const { postContent, firstName, lastName, rank, organization } = this.props;
    this.props.sendButtonPressed(postContent, firstName, lastName, rank, organization);
  }

  renderButton = () => {
    if (this.props.posting) {
      return (
        <Spinner />
      );
    } else if (this.props.postContent === '') {
      return;
    } return (
      <Button
        style={styles.sendButton}
        onPress={() => this.onSendButtonPress()}
      >
        <Text style={styles.sendButtonText}>POST</Text>
      </Button>
    );
  }

  renderFeed = () => {
    if (this.props.loadingList) {
      return <Spinner />;
    } else if (this.props.error) {
      return (<Text>{this.props.error}</Text>);
    } return (
      <List
        enableEmptySections
        dataArray={this.props.feedData}
        renderRow={this.renderPost}
        keyExtractor={(post) => post.time}
      />
    );
  }

  renderPost = (post) => {
    const { name, postContent, time } = post;
    return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: 'https://cdn.images.express.co.uk/img/dynamic/4/590x/LeBron-James-has-until-June-29-to-opt-out-of-his-contract-with-the-Cavaliers-978390.jpg?r=1529715616214' }} />
            <Body>
              <Text>{name}</Text>
              <Text note>{time}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{postContent}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.messageBoxContainer}>
            <Input
              onChangeText={this.props.postChanged.bind(this)}
              value={this.props.postContent}
              style={styles.messageBox}
            />
            {this.renderButton()}
          </View>
          {this.renderFeed()}
        </Content>
      </Container>
    );
  }
}

const styles = {
  messageBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#cccccc',
    backgroundColor: '#eeeeee',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  messageBox: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dddddd',
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
  },
  sendButton: {
    marginLeft: 10,
    marginRight: 5,
  },
  sendButtonText: {
    fontSize: 10,
    fontWeight: '500'
  }
};

const mapStateToProps = (state) => {
  const { postContent, posting, loadingList, feedData } = state.feed;
  const { firstName, lastName, rank, organization } = state.auth;
  return (
    { postContent, posting, loadingList, feedData, firstName, lastName, rank, organization }
  );
};

export default connect(mapStateToProps, { postChanged, sendButtonPressed, fetchFeed })(FeedScreen);
