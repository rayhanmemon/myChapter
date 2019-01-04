import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';

export default class Stat extends Component {
  renderColor(progress) {
    if (progress <= 0.2) {
      return '#F00';
    } else if (progress <= 0.5) {
      return '#FF8C00';
    } else if (progress < 1) {
      return '#CCCC00';
    }
    return '#008000';
  }
  renderRemainingText(current, total, unit, completionText) {
    if (current >= total) {
      return (
        <Text style={styles.remainingText}>{completionText}</Text>
      );
    } return (
      <Text style={styles.remainingText}>{current}/{total} {unit}</Text>
    );
  }

  render() {
    const { type, title, current, total, unit, completionText } = this.props;
    const progress = current / total;

    switch (type) {
      case 'bar':
        return (
          <View>
            <Text style={styles.title}>{title}</Text>
            <Progress.Bar
              progress={progress}
              width={300}
              height={10}
              color={this.renderColor(progress)}
            />
            {this.renderRemainingText(current, total, unit, completionText)}
          </View>
        );
      case 'pie':
        return (
          <View style={styles.pieStatContainer}>
            <Text style={styles.title}>{title}</Text>
            <Progress.Pie
              style={styles.pie}
              progress={progress}
              size={100}
              color={this.renderColor(progress)}
            />
            <Text>{current}/{total}</Text>
          </View>
        );
      default:
        return (
          <Text>Error</Text>
        );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    marginBottom: 5
  },
  remainingText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 10
  },
  pie: {
    margin: 10
  },
  pieStatContainer: {
    alignItems: 'center'
  }
};
