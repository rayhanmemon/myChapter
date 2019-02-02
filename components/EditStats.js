import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Text, Picker, Spinner, Icon, Image, Button } from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import firebase from 'firebase';

import {
  loadProfileStats,
  positionEdited,
  duesEdited,
  communityServiceEdited,
  chaptersEdited,
  mixersEdited,
  brotherhoodsEdited,
  goodStandingEdited,
  adminEdited,
  saveStats,
  uploadImageAttempt,
  uploadImageSuccess,
  initializeStandingAndPriveleges
} from '../actions';

class EditStats extends Component {
  /*
  onChooseImagePress = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancel) {
        this.props.uploadImageAttempt();
        this.uploadImage(result.uri, 'test-image')
          .then(() => {
            Alert.alert('Success!');
            this.props.uploadImageSuccess(result.uri);
          })
          .catch((error) => {
            Alert.alert(error);
          });
      }
    }
    return;
  }

  uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`${this.props.organization}/profile-pictures/${this.props.rank}.jpg`);
    ref.put(blob);
  };
  */
  componentDidMount() {
    const adminInitial = this.props.profile.admin.toString();
    const standingInitial = this.props.profile.goodStanding.toString();
    this.props.initializeStandingAndPriveleges(adminInitial, standingInitial);
  }

  saveButtonPressed(organization, rank) {
    let admin = (this.props.admin === 'true');
    if ((this.props.rank === this.props.profile.rank) && (this.props.userIsAdmin)) {
      admin = true;
    }

    const newStats = {
      admin,
      position: this.props.position,
      goodStanding: (this.props.goodStanding === 'true'),
      dues: parseInt(this.props.dues, 10),
      communityService: parseInt(this.props.communityService, 10),
      chapters: parseInt(this.props.chapters, 10),
      mixers: parseInt(this.props.mixers, 10),
      brotherhoods: parseInt(this.props.brotherhoods, 10)
    };
    this.props.saveStats(organization, rank, newStats);
  }

  renderError() {
    const { error } = this.props;
    if (error) {
      return (
        <Text style={styles.error}>{error}</Text>
      );
    } return;
  }

  renderButton(rank) {
    const { loading, organization } = this.props;
    if (loading) {
      return <Spinner />;
    } return (
      <Button
        full
        danger
        onPress={() => this.saveButtonPressed(organization, rank)}
      >
        <Text>Save Changes</Text>
      </Button>
    );
  }

  renderAdminPicker() {
    if (!(this.props.rank === this.props.profile.rank)) {
      return (
        <Item picker>
         <Picker
           mode="dropdown"
           style={{ width: undefined }}
           iosIcon={<Icon name="ios-arrow-down" />}
           placeholder='Privileges'
           placeholderStyle={{ color: 'black' }}
           selectedValue={this.props.admin}
           onValueChange={this.props.adminEdited.bind(this)}
         >
           <Picker.Item label="Full Admin" value='true' />
           <Picker.Item label="No Privileges" value='false' />
         </Picker>
        </Item>
      );
    } return;
  }

  render() {
    const { position, goodStanding, dues, communityService, chapters, mixers, brotherhoods } = this.props;

    const positionInitial = this.props.profile.position;
    const duesInitial = this.props.profile.dues.toString();
    const communityServiceInitial = this.props.profile.communityService.toString();
    const chaptersInitial = this.props.profile.chapters.toString();
    const mixersInitial = this.props.profile.mixers.toString();
    const brotherhoodsInitial = this.props.profile.brotherhoods.toString();
    const rank = this.props.profile.rank;
    //const image = this.props.image;

    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
            {/*<Button
              transparent
              onPress={() => this.onChooseImagePress()}
            >
              <Text>Select New Profile Picture</Text>
            </Button>*/}
            <Form>
              {this.renderAdminPicker()}
               <Item picker>
               <Picker
                 mode="dropdown"
                 style={{ width: undefined }}
                 placeholder='Standing'
                 iosIcon={<Icon name="ios-arrow-down" />}
                 placeholderStyle={{ color: 'black' }}
                 selectedValue={goodStanding}
                 onValueChange={this.props.goodStandingEdited.bind(this)}
               >
                 <Picker.Item label="Good Standing" value='true' />
                 <Picker.Item label="Bad Standing" value='false' />
               </Picker>
               </Item>
               <Item>
                <Label style={{ color: 'black' }}>Position</Label>
                <Input
                  placeholder={positionInitial}
                  onChangeText={this.props.positionEdited.bind(this)}
                  value={position}
                />
              </Item>
              <Item>
                <Label style={{ color: 'black' }}>Dues</Label>
                <Input
                  placeholder={duesInitial}
                  onChangeText={this.props.duesEdited.bind(this)}
                  value={dues}
                />
              </Item>
              <Item>
                <Label style={{ color: 'black' }}>Community Service</Label>
                <Input
                  placeholder={communityServiceInitial}
                  onChangeText={this.props.communityServiceEdited.bind(this)}
                  value={communityService}
                />
              </Item>
              <Item>
                <Label style={{ color: 'black' }}>Chapters</Label>
                <Input
                  placeholder={chaptersInitial}
                  onChangeText={this.props.chaptersEdited.bind(this)}
                  value={chapters}
                />
              </Item>
              <Item>
                <Label style={{ color: 'black' }}>Mixers</Label>
                <Input
                  placeholder={mixersInitial}
                  onChangeText={this.props.mixersEdited.bind(this)}
                  value={mixers}
                />
              </Item>
              <Item>
                <Label style={{ color: 'black' }}>Brotherhoods</Label>
                <Input
                  placeholder={brotherhoodsInitial}
                  onChangeText={this.props.brotherhoodsEdited.bind(this)}
                  value={brotherhoods}
                />
              </Item>
            </Form>
            {this.renderError()}
            {this.renderButton(rank)}
          </Content>
      </Container>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    flexDirection: 'column',
    padding: 25,
  },
  picture: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  positionAndStanding: {
    flex: 1,
    flexDirection: 'row',
  },
  error: {
    fontSize: 15,
    color: '#EA2027',
    marginBottom: 15,
    marginTop: 15,
    textAlign: 'center'
  }
};

const mapStateToProps = (state) => {
  const { position, goodStanding, dues, communityService, chapters, mixers, brotherhoods, loading, admin, image, error } = state.selectedProfile;
  const { organization, rank, admin: userIsAdmin } = state.auth;
  return (
    {
      admin,
      image,
      position,
      dues,
      communityService,
      chapters,
      mixers,
      brotherhoods,
      organization,
      goodStanding,
      loading,
      rank,
      userIsAdmin,
      error
    }
  );
};

export default connect(mapStateToProps, {
  loadProfileStats,
  positionEdited,
  duesEdited,
  communityServiceEdited,
  chaptersEdited,
  mixersEdited,
  brotherhoodsEdited,
  goodStandingEdited,
  adminEdited,
  saveStats,
  uploadImageSuccess,
  uploadImageAttempt,
  initializeStandingAndPriveleges
})(EditStats);
