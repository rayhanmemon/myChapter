import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Spinner, Text, Body, Right, Button, View } from 'native-base';
import { fetchActivesList, fetchSelectedProfile } from '../../actions';

class ActivesScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Statistics',
    headerStyle: {
      backgroundColor: '#ff0000',
    },
    headerTintColor: '#fff'
  };

  constructor(props) {
    super(props);
    this.onActiveSelect = this.onActiveSelect.bind(this);
  }

  componentWillMount() {
    this.props.fetchActivesList(this.props.organization);
  }

  onActiveSelect(name, rank) {
    const { admin } = this.props;
    this.props.fetchSelectedProfile(this.props.organization, rank);
    this.props.navigation.navigate('SelectedProfile', { title: name, admin });
  }

  renderActivesList() {
    if (this.props.loadingList) {
      return <Spinner />;
    } else if (this.props.error) {
      return (<Text>{this.props.error}</Text>);
    } return (
    <View>
      <List
        removeClippedSubviews={false}
        dataArray={this.props.listData}
        renderRow={this.renderRow}
        keyExtractor={(active) => active.rank}
      />
    </View>
    );
  }

  renderRow = (active) => {
    let position = active.position;
    if (active.position === 'No Position') {
      position = '';
    }
    const name = `${active.firstName} ${active.lastName}`;
    return (
      <ListItem
        button
        onPress={() => { this.onActiveSelect(name, active.rank); }}
      >
        <Body>
          <Text>{name}</Text>
          <Text style={{ fontSize: 14, fontStyle: 'italic', opacity: 0.7 }}>{position}</Text>
        </Body>
        <Right>
          <Text>{active.rank}</Text>
        </Right>
      </ListItem>
    );
  }

  renderObserverList = () => {
    if (this.props.loadingList || this.props.error || !this.props.observerData) {
      return;
    } return (
    <View>
      <Text style={styles.listTitle}>ALUMNUS OBSERVERS</Text>
      <List
        removeClippedSubviews={false}
        dataArray={this.props.observerData}
        renderRow={this.renderObserverRow}
        keyExtractor={(active) => active.rank}
      />
    </View>
    );
  }

  renderObserverRow = (observer) => {
    let position = observer.position;
    if (observer.position === 'No Position') {
      position = '';
    }
    const name = `${observer.firstName} ${observer.lastName}`;
    return (
      <ListItem>
        <Body>
          <Text>{name}</Text>
          <Text style={{ fontSize: 14, fontStyle: 'italic', opacity: 0.7 }}>{position}</Text>
        </Body>
        <Right>
          <Text>{observer.rank}</Text>
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <Button
            transparent
            danger
            onPress={() => this.props.navigation.navigate('Settings')}
          >
            <Text>Settings</Text>
          </Button>
          <Text style={styles.listTitle}>ACTIVE MEMBERS</Text>
          {this.renderActivesList()}
          {this.renderObserverList()}
        </Content>
      </Container>
    );
  }
}

const styles = {
  listTitle: {
    marginTop: 25,
    marginLeft: 20,
    marginBottom: 13,
    fontSize: 15,
    opacity: 0.8,
    fontWeight: 'bold',
  }
};

const mapStateToProps = (state) => {
  const { loadingList, error, listData, observerData, selectedUserRank } = state.actives;
  const { organization, rank, admin } = state.auth;
  return (
    { loadingList, error, listData, selectedUserRank, organization, rank, admin, observerData }
  );
};

export default connect(mapStateToProps, { fetchActivesList, fetchSelectedProfile })(ActivesScreen);
