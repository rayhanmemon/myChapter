import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Content, Thumbnail, Text } from 'native-base';
import Stat from './Stat';

import { initializeTotals } from '../actions';

class BrotherStats extends Component {

  renderStanding(goodStanding) {
    if (goodStanding) {
      return (
      <Text style={{ fontSize: 13, color: '#006400', marginBottom: 15 }}>
        Good Standing
      </Text>
      );
    } return (
      <Text style={{ fontSize: 13, color: '#F00', marginBottom: 20 }}>
        Bad Standing
      </Text>
    );
  }

  render() {
    this.props.initializeTotals(this.props.organization);
    const picture = 'https://cdn.images.express.co.uk/img/dynamic/4/590x/LeBron-James-has-until-June-29-to-opt-out-of-his-contract-with-the-Cavaliers-978390.jpg?r=1529715616214';
    const position = this.props.profile.position;
    const goodStanding = this.props.profile.goodStanding;
    const dues = this.props.profile.dues;
    const communityService = this.props.profile.communityService;
    const chapters = this.props.profile.chapters;
    const mixers = this.props.profile.mixers;
    const brotherhoods = this.props.profile.brotherhoods;

    const { totalDues, totalCommunityService, totalChapters, totalMixers, totalBrotherhoods } = this.props;

    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Thumbnail style={styles.picture} source={{ uri: picture }} />
          <Text style={styles.position}>{position}</Text>
          {this.renderStanding(goodStanding)}
          <Stat
            type='bar'
            title='Dues'
            current={dues}
            total={totalDues}
            unit='dollars'
            completionText='All dues paid!'
          />
          <Stat
            type='bar'
            title='Community Service'
            current={communityService}
            total={totalCommunityService}
            unit='hours'
            completionText='All hours complete!'
          />
          <Text style={{ marginTop: 10, fontSize: 20 }}>Attendance</Text>
          <View style={styles.attendanceContainer}>
            <Stat
              type='pie'
              title='Mixers'
              current={mixers}
              total={totalMixers}
            />
            <Stat
              type='pie'
              title='Chapters'
              current={chapters}
              total={totalChapters}
            />
            <Stat
              type='pie'
              title='Brotherhoods'
              current={brotherhoods}
              total={totalBrotherhoods}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  content: {
    padding: 25,
    alignItems: 'center'
  },
  picture: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  position: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 3,
  },
  attendanceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
};

const mapStateToProps = (state) => {
  const { totalDues, totalCommunityService, totalChapters, totalMixers, totalBrotherhoods } = state.selectedProfile;
  const { organization } = state.auth;
  return {
    totalDues,
    totalCommunityService,
    totalChapters,
    totalMixers,
    totalBrotherhoods,
    organization
  };
};

export default connect(mapStateToProps, { initializeTotals })(BrotherStats);
