import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Thumbnail, Form, Item, Input, Label, Button, Text, Picker, Spinner } from 'native-base';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';

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
  saveStats
} from '../actions';

class EditStats extends Component {

  saveButtonPressed(organization, rank) {
    const newStats = {
      admin: (this.props.admin === 'true'),
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
        <Text>SAVE CHANGES</Text>
      </Button>
    );
  }

  render() {
    const { admin, position, goodStanding, dues, communityService, chapters, mixers, brotherhoods } = this.props;

    const positionInitial = this.props.profile.position;
    const duesInitial = this.props.profile.dues.toString();
    const communityServiceInitial = this.props.profile.communityService.toString();
    const chaptersInitial = this.props.profile.chapters.toString();
    const mixersInitial = this.props.profile.mixers.toString();
    const brotherhoodsInitial = this.props.profile.brotherhoods.toString();

    const picture = 'https://cdn.images.express.co.uk/img/dynamic/4/590x/LeBron-James-has-until-June-29-to-opt-out-of-his-contract-with-the-Cavaliers-978390.jpg?r=1529715616214';
    const rank = this.props.profile.rank;

    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
            <Thumbnail
              style={styles.picture}
              source={{ uri: picture }}
            />
          </View>
          <Form style={{ marginTop: 10 }}>
            <Item picker>
             <Picker
               mode="dropdown"
               style={{ width: undefined }}
               placeholder='Privileges'
               placeholderStyle={{ color: '#00f' }}
               selectedValue={admin}
               onValueChange={this.props.adminEdited.bind(this)}
             >
               <Picker.Item label="Full Admin" value='true' />
               <Picker.Item label="No Privileges" value='false' />
             </Picker>
            </Item>
            <Item picker>
             <Picker
               mode="dropdown"
               style={{ width: undefined }}
               placeholder='Standing'
               placeholderStyle={{ color: '#00f' }}
               selectedValue={goodStanding}
               onValueChange={this.props.goodStandingEdited.bind(this)}
             >
               <Picker.Item label="Good Standing" value='true' />
               <Picker.Item label="Bad Standing" value='false' />
             </Picker>
            </Item>
            <Item>
              <Label>Position</Label>
              <Input
                placeholder={positionInitial}
                onChangeText={this.props.positionEdited.bind(this)}
                value={position}
              />
            </Item>
            <Item>
              <Label>Dues</Label>
              <Input
                placeholder={duesInitial}
                onChangeText={this.props.duesEdited.bind(this)}
                value={dues}
              />
            </Item>
            <Item>
              <Label>Community Service</Label>
              <Input
                placeholder={communityServiceInitial}
                onChangeText={this.props.communityServiceEdited.bind(this)}
                value={communityService}
              />
            </Item>
            <Item>
              <Label>Chapters</Label>
              <Input
                placeholder={chaptersInitial}
                onChangeText={this.props.chaptersEdited.bind(this)}
                value={chapters}
              />
            </Item>
            <Item>
              <Label>Mixers</Label>
              <Input
                placeholder={mixersInitial}
                onChangeText={this.props.mixersEdited.bind(this)}
                value={mixers}
              />
            </Item>
            <Item>
              <Label>Brotherhoods</Label>
              <Input
                placeholder={brotherhoodsInitial}
                onChangeText={this.props.brotherhoodsEdited.bind(this)}
                value={brotherhoods}
              />
            </Item>
          </Form>
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
  }
};

const mapStateToProps = (state) => {
  const { position, goodStanding, dues, communityService, chapters, mixers, brotherhoods, loading, admin } = state.selectedProfile;
  const { organization } = state.auth;
  return (
    {
      admin,
      position,
      dues,
      communityService,
      chapters,
      mixers,
      brotherhoods,
      organization,
      goodStanding,
      loading
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
  saveStats
})(EditStats);
