import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, Card, CardItem, Body, Text, Left, Right, Button, Input, Spinner } from 'native-base';
import ExpandingTextInput from '../../components/ExpandingTextInput';
import { Notifications, Permissions } from 'expo';
import firebase from 'firebase';

import {
  postChanged,
  sendButtonPressed,
  fetchFeed,
  deletePost,
  showComments,
  commentChanged,
  onCommentButtonPress,
  selectForCommenting,
  hideComments,
  fetchUsersStats,
  deleteComment
} from '../../actions';

class FeedScreen extends Component {
  static navigationOptions = {
      title: 'Announcements',
      headerStyle: {
        backgroundColor: '#ff0000',
      },
      headerTintColor: '#fff',
    };

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.willFocus);
    this.props.fetchUsersStats(this.props.organization, this.props.rank);
    this.registerForPushNotifications();
  }

  componentWillUnmount() {
    if (this.willFocusSubscription) {
      this.willFocusSubscription.remove();
    }
  }

  onSendButtonPress = () => {
    const { postContent, firstName, lastName, rank, organization } = this.props;
    console.log(postContent);
    if (postContent) {
      this.props.sendButtonPressed(postContent, firstName, lastName, rank, organization);
    }
  }

  willFocus = () => {
    this.props.fetchFeed(this.props.organization);
  }

  registerForPushNotifications = async () => {
    const { organization, rank } = this.props;
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();
  firebase.database().ref(`${organization}/profiles/${rank}/pushToken`).set(token);
}

  handleCommentButtonPress(key, comments) {
    const commentContent = this.commentContent;
    const { firstName, lastName, organization, rank } = this.props;
    if (commentContent) {
      this.props.onCommentButtonPress(organization, firstName, lastName, key, commentContent, comments, rank);
    }
  }

  renderButton = () => {
    if (this.props.posting) {
      return (
        <Spinner />
      );
    } return (
      <Button
        style={styles.sendButton}
        onPress={() => this.onSendButtonPress()}
      >
        <Text style={styles.sendButtonText}>POST</Text>
      </Button>
    );
  }

  renderDeletePostButton = (key, rank) => {
    if (this.props.postToDelete === key) {
      return <Spinner />;
    } else if (this.props.admin || (this.props.rank === rank)) {
      return (
        <Button
          transparent
          danger
          onPress={() => this.props.deletePost(this.props.organization, key)}
        >
          <Text style={{ fontSize: 12 }}>Delete</Text>
        </Button>
      );
    } return;
  }

  renderCommentButton = (key, comments) => {
    if (this.props.commenting) {
      return (
        <Spinner />
      );
    } return (
      <Button
        light
        style={styles.sendButton}
        onPress={() => this.handleCommentButtonPress(key, comments)}
      >
        <Text style={styles.sendButtonText}>COMMENT</Text>
      </Button>
    );
  }

  renderCommentCount = (key, comments) => {
    if (!this.props.commentsShown) {
      if (comments === 0) {
        return;
      } return (
          <Button
            transparent
            info
            onPress={() => this.props.showComments(this.props.organization, key)}
          >
            <Text style={{ fontSize: 13 }}>{comments} comments</Text>
          </Button>
      );
    }
  }

  renderFeed = () => {
    const random = Math.floor((Math.random() * 100) + 1);
    const listKey = `${random}${this.props.loadingList}`;
    if (this.props.loadingList) {
      return <Spinner />;
    } else if (this.props.error) {
      return (<Text>{this.props.error}</Text>);
    } return (
      <List
        key={listKey}
        removeClippedSubviews={false}
        dataArray={this.props.feedData}
        renderRow={this.renderPost}
        keyExtractor={(post) => post.key}
      />
    );
  }

  renderDeleteCommentButton = (postKey, commentKey, rankOfCommenter) => {
    if (this.props.commentToDelete) {
      return (
        <Spinner />
      );
    } else if (this.props.admin || (this.props.rank === rankOfCommenter)) {
      return (
        <Right>
          <Button
            transparent
            danger
            onPress={() => this.props.deleteComment(this.props.organization, postKey, commentKey)}
          >
            <Text style={{ fontSize: 12 }}>Delete</Text>
          </Button>
        </Right>
      );
  } return;
}

  renderCommentRow = (comment) => {
    console.log(comment);
    const postKey = this.props.commentsShown;
    const commentKey = comment.commentKey;
    const rankOfCommenter = comment.rank;
    return (
      <CardItem>
        <Left>
          <Body>
            <Text style={{ fontWeight: 'bold', fontSize: 14.5 }}>{comment.name}</Text>
            <Text note style={{ fontSize: 13, marginBottom: 3 }}>{comment.time}</Text>
            <Text style={{ fontSize: 14 }}>{comment.commentContent}</Text>
          </Body>
        </Left>
        {this.renderDeleteCommentButton(postKey, commentKey, rankOfCommenter)}
      </CardItem>
    );
  }

  renderComments = (key) => {
    if (this.props.commentsShown === key) {
      return (
        <View>
          <Button
            transparent
            info
            onPress={() => this.props.hideComments()}
          >
           <Text style={{ fontSize: 13 }}>Hide Comments</Text>
          </Button>
          <List
            enableEmptySections
            dataArray={this.props.comments}
            renderRow={this.renderCommentRow}
          />
        </View>
      );
    }
  };

  renderCommentInput = (key, comments) => {
    if (this.props.selectedForCommenting === key) {
    return (
      <View>
        {this.renderComments(key)}
        <CardItem>
          <Button
            transparent
            info
            onPress={() => this.props.selectForCommenting('')}
          >
            <Text style={{ fontSize: 13 }}>Cancel</Text>
          </Button>
          {this.renderCommentCount(key, comments)}
        </CardItem>
        <CardItem>
          <ExpandingTextInput
            onChangeText={(text) => this.commentContent = text}
            style={styles.messageBox}
            placeholder='comment here...'
            multiline
          />
          {this.renderCommentButton(key, comments)}
        </CardItem>
      </View>
      );
    } return (
      <View>
        {this.renderComments(key)}
        <CardItem>
          <Button
            transparent
            info
            onPress={() => this.props.selectForCommenting(key)}
          >
            <Text style={{ fontSize: 13 }}>Leave Comment</Text>
          </Button>
          {this.renderCommentCount(key, comments)}
        </CardItem>
      </View>
    );
  }

  renderPost = (post) => {
    const { name, postContent, time, key, comments, rank } = post;
    return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            {/*
            <Thumbnail source={{ uri: url }} />
            */}
            <Body>
              <Text style={{ fontWeight: 'bold' }}>{name}</Text>
              <Text note>{time}</Text>
            </Body>
          </Left>
          {this.renderDeletePostButton(key, rank)}
        </CardItem>
        <CardItem>
          <Body>
            <Text>{postContent}</Text>
          </Body>
        </CardItem>
        {this.renderCommentInput(key, comments)}
      </Card>
    );
  }

  render() {
    return (
      <Container>
        <Content style={styles.contentContainer}>
          <View style={styles.messageBoxContainer}>
            <ExpandingTextInput
              onChangeText={this.props.postChanged.bind(this)}
              value={this.props.postContent}
              style={styles.messageBox}
              multiline
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
  contentContainer: {
    backgroundColor: '#eeeeee'
  },
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
  const { postContent, posting, loadingList, feedData, postToDelete, commentToDelete, comments, commentsShown, commentContent, selectedForCommenting } = state.feed;
  const { firstName, lastName, rank, organization, admin } = state.auth;
  return {
    postContent,
    posting,
    loadingList,
    feedData,
    firstName,
    lastName,
    rank,
    organization,
    admin,
    postToDelete,
    commentToDelete,
    comments,
    commentsShown,
    commentContent,
    selectedForCommenting
  };
};

export default connect(mapStateToProps, {
  postChanged,
  sendButtonPressed,
  fetchFeed,
  deletePost,
  showComments,
  commentChanged,
  onCommentButtonPress,
  selectForCommenting,
  hideComments,
  fetchUsersStats,
  deleteComment
})(FeedScreen);
