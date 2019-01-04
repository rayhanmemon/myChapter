import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner, Text, Button } from 'native-base';
import BrotherStats from '../../components/BrotherStats';
import EditStats from '../../components/EditStats';

import { toggleAdminMode } from '../../actions';

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    if (navigation.state.params.admin) {
      return {
        headerTitle: `${navigation.state.params.title}`,
        headerRight: (
          <Button
            transparent
            light
            onPress={navigation.getParam('adminButton')}
          >
            <Text>Admin</Text>
          </Button>
        ),
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#ff0000',
        },
      };
    } return {
      headerTitle: `${navigation.state.params.title}`,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ff0000',
      },
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ adminButton: this.adminButtonPressed });
  }

  adminButtonPressed = () => {
    const { adminModeActive } = this.props;
    this.props.toggleAdminMode(adminModeActive);
  };


  renderProfileScreen = () => {
    if (this.props.loadingProfile) {
      return <Spinner color='green' />;
    } else if (this.props.error) {
      return (
        <Text>Failed to Load Profile</Text>
      );
    }
    //if reading profile info is successful, create stats object and pass to
    //BrotherStats component
    const profile = {
      admin: this.props.selectedAdmin,
      brotherhoods: this.props.selectedBrotherhoods,
      chapters: this.props.selectedChapters,
      communityService: this.props.selectedCommunityService,
      dues: this.props.selectedDues,
      firstName: this.props.selectedFirstName,
      lastName: this.props.selectedLastName,
      mixers: this.props.selectedMixers,
      position: this.props.selectedPosition,
      goodStanding: this.props.selectedGoodStanding,
      rank: this.props.selectedRank,
    };
    if (this.props.adminModeActive) {
      return <EditStats profile={profile} />;
    }
    return <BrotherStats profile={profile} />;
  }

  render() {
    return (
        this.renderProfileScreen()
    );
  }
}

const mapStateToProps = (state) => {
  const {
    loadingProfile,
    error,
    selectedAdmin,
    selectedBrotherhoods,
    selectedChapters,
    selectedCommunityService,
    selectedDues,
    selectedFirstName,
    selectedLastName,
    selectedMixers,
    selectedPosition,
    selectedRank,
    selectedGoodStanding } = state.actives;
  const { organization } = state.auth;
  const { adminModeActive } = state.selectedProfile;

  return (
    {
    organization,
    loadingProfile,
    error,
    selectedAdmin,
    selectedBrotherhoods,
    selectedChapters,
    selectedCommunityService,
    selectedDues,
    selectedFirstName,
    selectedLastName,
    selectedMixers,
    selectedPosition,
    selectedRank,
    selectedGoodStanding,
    adminModeActive,
    }
  );
};

export default connect(mapStateToProps, { toggleAdminMode })(ProfileScreen);
