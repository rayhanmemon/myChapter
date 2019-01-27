import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Container, Content, Spinner, View, Text } from 'native-base';
import SettingsList from 'react-native-settings-list';

import {
  fetchAdminSettings,
  logout
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

  willFocus() {
    this.props.fetchAdminSettings(this.props.organization);
  }

  renderAdminSettings(admin) {
    if (this.props.loadingAdminSettings) {
      return <Spinner />;
    } if (admin) {
        return (
        <SettingsList>
         <SettingsList.Header headerText='Administrator Settings' headerStyle={{ color: 'black', fontSize: 20, fontWeight: 'bold' }} />
         <SettingsList.Header headerText='Security Code' headerStyle={{ color: 'black', fontWeight: 'bold', marginTop: 20 }} />
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
         <SettingsList.Header headerText='Stat Thresholds' headerStyle={{ color: 'black', fontWeight: 'bold', marginTop: 20 }} />
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
        </SettingsList>
      );
    } return;
  }

  renderUserSettings() {
    if (!this.props.rank) {
      this.props.navigation.navigate('Login');
    }
    return (
      <SettingsList>
       <SettingsList.Header headerText='User Settings' headerStyle={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 30 }} />
       <SettingsList.Item
         title='Logout'
         backgroundColor='white'
         titleStyle={{ color: 'red' }}
         onPress={() => this.props.logout()}
       />
      </SettingsList>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ flex: 1, marginTop: 50 }}>
              <Text style={{ fontColor: 'red', fontSize: 10 }}>
                {this.props.errorMessage}
              </Text>
              {this.renderAdminSettings(this.props.admin)}
              {this.renderUserSettings()}
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
    errorMessage
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
    totalMixers,
    errorMessage
  });
};

export default connect(mapStateToProps, {
  fetchAdminSettings,
  logout
})(SettingsScreen);
