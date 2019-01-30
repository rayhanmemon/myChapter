import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Container, Content, Text, List, ListItem, Spinner, Body } from 'native-base';

import { regChapterChanged, fetchOrganizationList } from '../../actions';


class SelectOrganizationScreen extends Component {
  static navigationOptions = {
    title: 'Select Organization',
  };

  constructor(props) {
    super(props);
    this.onOrgSelect = this.onOrgSelect.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.props.fetchOrganizationList();
  }

  onOrgSelect(organization) {
    this.props.regChapterChanged(organization);
    this.props.navigation.goBack();
  }

  renderOrganizationList() {
    if (this.props.loadingOrgList) {
      return <Spinner />;
    } return (
      <List
        enableEmptySections
        dataArray={this.props.organizationList}
        renderRow={this.renderRow}
        keyExtractor={(organization) => organization}
      />
    );
  }

  renderRow(organization) {
    return (
      <ListItem
        button
        onPress={() => this.onOrgSelect(organization)}
      >
        <Body>
          <Text>{organization}</Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          {this.renderOrganizationList()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { organizationList, organization, loadingOrgList } = state.register;
  console.log(organizationList, organization, loadingOrgList);
  return ({ organizationList, organization, loadingOrgList });
};

export default connect(mapStateToProps, { regChapterChanged, fetchOrganizationList })(SelectOrganizationScreen);
