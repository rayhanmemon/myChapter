import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Content, Spinner, View } from 'native-base';
import SettingsList from 'react-native-settings-list';

import {
  fetchAdminSettings,
} from '../../actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
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
    this.props.fetchAdminSettings(this.props.organization);
  }

  renderAdminSettings(admin) {
    if (this.props.loadingAdminSettings) {
      return <Spinner />;
    } if (admin) {
        return (
        <SettingsList>
         <SettingsList.Header headerText='Statistics Thresholds' headerStyle={{ color: 'black', fontWeight: 'bold' }} />
         <SettingsList.Item
           title={`Total Dues (${this.props.totalDues} dollars)`}
           backgroundColor='white'
           titleStyle={{ color: 'black' }}
           onPress={() => this.props.navigation.navigate('EditThreshold', {
             title: 'Edit Total Dues Owed',
             value: 'totalDues',
             currentValue: this.props.totalDues,
           })}
         />
         <SettingsList.Item
           title={`Community Service Required (${this.props.totalCommunityService} Hours)`}
           backgroundColor='white'
           titleStyle={{ color: 'black' }}
           onPress={() => this.props.navigation.navigate('EditThreshold', {
             title: 'Edit CS Hours Needed',
             value: 'totalCommunityService',
             currentValue: this.props.totalCommunityService,
           })}
         />
           <SettingsList.Item
             title={`Total Chapters (${this.props.totalChapters})`}
             backgroundColor='white'
             titleStyle={{ color: 'black' }}
             onPress={() => this.props.navigation.navigate('EditThreshold', {
               title: 'Edit Total Chapters',
               value: 'totalChapters',
               currentValue: this.props.totalChapters,
             })}
           />
           <SettingsList.Item
             title={`Total Mixers (${this.props.totalMixers})`}
             backgroundColor='white'
             titleStyle={{ color: 'black' }}
             onPress={() => this.props.navigation.navigate('EditThreshold', {
               title: 'Edit Total Mixers',
               value: 'totalMixers',
               currentValue: this.props.totalMixers,
             })}
           />
           <SettingsList.Item
             title={`Total Brotherhoods (${this.props.totalBrotherhoods})`}
             backgroundColor='white'
             titleStyle={{ color: 'black' }}
             onPress={() => this.props.navigation.navigate('EditThreshold', {
               title: 'Edit Total Brotherhoods',
               value: 'totalBrotherhoods',
               currentValue: this.props.totalBrotherhoods,
             })}
           />
          <SettingsList.Header headerText='SecurityCode' headerStyle={{ color: 'black', fontWeight: 'bold', marginTop: 30 }} />
          <SettingsList.Item
            title={`${this.props.securityCode}`}
            backgroundColor='white'
            titleStyle={{ color: 'red' }}
            onPress={() => this.props.navigation.navigate('EditThreshold', {
              title: 'Change Security Code',
              value: 'securityCode',
              currentValue: this.props.securityCode,
            })}
          />
        </SettingsList>
      );
    } return;
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ flex: 1, marginTop: 50 }}>
              {this.renderAdminSettings(this.props.admin)}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { organization, rank, firstName, lastName, admin } = state.auth;

  const { loadingAdminSettings,
    securityCode,
    totalBrotherhoods,
    totalChapters,
    totalCommunityService,
    totalDues,
    totalMixers,
  } = state.settings;

  return ({
    organization,
    rank,
    firstName,
    lastName,
    admin,
    loadingAdminSettings,
    securityCode,
    totalBrotherhoods,
    totalChapters,
    totalCommunityService,
    totalDues,
    totalMixers
  });
};

export default connect(mapStateToProps, {
  fetchAdminSettings,
})(SettingsScreen);
