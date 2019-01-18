import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, List, Card, CardItem, Body, Text, Left, Right, Button, Input, Spinner } from 'native-base';

import {
  postChanged,
  sendButtonPressed,
  fetchFeed,
  deletePost,
  showComments,
  renderCommentInput,
  hideCommentInput,
  commentChanged,
  onCommentButtonPress
} from '../../actions';

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

  renderDeletePostButton(key) {
    if (this.props.postToDelete === key) {
      return <Spinner />;
    } else if (this.props.admin) {
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

  renderCommentButton = (key) => {
    const { firstName, lastName, organization, commentContent } = this.props;
    console.log(key, commentContent);
    if (this.props.commenting) {
      return (
        <Spinner />
      );
    } else if (this.props.commentContent === '') {
      return;
    } return (
      <Button
        light
        style={styles.sendButton}
        onPress={() => this.props.onCommentButtonPress(organization, firstName, lastName, key, commentContent)}
      >
        <Text style={styles.sendButtonText}>COMMENT</Text>
      </Button>
    );
  }

  renderCommentCount = (key, comments) => {
    if (comments === 0) {
      return;
    } return (
      <Button
        transparent
        onPress={() => this.props.showComments(this.props.organization, key)}
      >
        <Text style={{ fontSize: 13 }}>{comments} comments</Text>
      </Button>
    );
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
        enableEmptySections
        dataArray={this.props.feedData}
        renderRow={this.renderPost}
        keyExtractor={(post) => post.key}
      />
    );
  }

  renderPost = (post) => {
    const { name, postContent, time, key, comments } = post;
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
          {this.renderDeletePostButton(key)}
        </CardItem>
        <CardItem>
          <Body>
            <Text>{postContent}</Text>
          </Body>
        </CardItem>
        <CardItem>
            {this.renderCommentCount(key, comments)}
        </CardItem>
        <CardItem>
        <Input
          onChangeText={this.props.commentChanged.bind(this)}
          value={this.props.postContent}
          style={styles.messageBox}
          placeholder='Comment here...'
        />
        {this.renderCommentButton(key)}
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
  const { postContent, posting, loadingList, feedData, postToDelete, comments, commentsLoading, commentBarShown, commentContent } = state.feed;
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
    comments,
    commentsLoading,
    commentBarShown,
    commentContent
  };
};

export default connect(mapStateToProps, {
  postChanged,
  sendButtonPressed,
  fetchFeed,
  deletePost,
  showComments,
  renderCommentInput,
  hideCommentInput,
  commentChanged,
  onCommentButtonPress
})(FeedScreen);
