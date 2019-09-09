import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, LayoutAnimation } from 'react-native';

import {
  Card,
  CardItem,
  Text,
  View,
} from 'native-base';

import _ from 'lodash';

import { lang } from 'lib/i18n';
import CandidateSet from './CandidateSet';
import HorizontalPicker from 'lib/HorizontalPicker';

import SessionStyles, { disjunctionWidth } from './Styles';

export default class Disjunction extends Component {

  static propTypes = {
    candidateSets: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    choice: PropTypes.number,
    label: PropTypes.object,
    makeDisclosureChoice: PropTypes.func,
  }

  static defaultProps = {
    choice: 0,
    label: null,
    makeDisclosureChoice: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      height: this.candidateSetHeight(props.candidateSets[props.choice]),
    };
  }

  renderCandidateSet = multiple => (candidateSet, index) => (
    <View key={index} style={{width: disjunctionWidth}}>
      <CandidateSet
        candidateSet={candidateSet}
        multiple={multiple}
        height={this.state.height}
        width={disjunctionWidth}
      />
    </View>
  );

  checkHeight = j => {
    if (!this.props.candidateSets[j])
      return;
    const newHeight = this.candidateSetHeight(this.props.candidateSets[j]);
    if (newHeight !== this.state.height) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({height: newHeight});
    }
  }

  // empty candidate sets are rendered with an explanatory label, so it has a height
  candidateSetHeight = candidateSet => ( candidateSet.length === 0 ? 1 :
    candidateSet.length + candidateSet.map(s => s.length).reduce((a, b) => a+b, 0) );

  render() {
    const {
      label,
      candidateSets,
      makeDisclosureChoice,
    } = this.props;

    const labelHeader = label ?
      <CardItem style={{...SessionStyles.borderBottom, paddingBottom: 10, ...styles.centerContent}}>
        <Text>
          { label[lang] }
        </Text>
      </CardItem> : undefined;

    const makeChoice = j => {
      if (makeDisclosureChoice)
        makeDisclosureChoice(j);
      this.checkHeight(j);
    };

    return (
      <Card rounded>
        { labelHeader }
        <HorizontalPicker
          makeChoice={makeChoice}
          width={disjunctionWidth}
        >
          { _.map(candidateSets, this.renderCandidateSet(candidateSets.length > 1)) }
        </HorizontalPicker>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-around',
  },
});