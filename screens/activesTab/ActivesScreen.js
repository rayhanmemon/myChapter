import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, List, ListItem, Spinner, Text, Body, Right, Button } from 'native-base';
import { fetchActivesList, fetchSelectedProfile } from '../../actions';

class ActivesScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Actives',
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
    <Content>
      <Button
        transparent
        danger
        onPress={() => this.props.navigation.navigate('Settings')}
      >
        <Text>Settings</Text>
      </Button>
      <List
        removeClippedSubviews={false}
        dataArray={this.props.listData}
        renderRow={this.renderRow}
        keyExtractor={(active) => active.rank}
      />
    </Content>
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

  render() {
    return (
      <Container>
        {this.renderActivesList()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { loadingList, error, listData, selectedUserRank } = state.actives;
  const { organization, rank, admin } = state.auth;
  return (
    { loadingList, error, listData, selectedUserRank, organization, rank, admin }
  );
};

export default connect(mapStateToProps, { fetchActivesList, fetchSelectedProfile })(ActivesScreen);
