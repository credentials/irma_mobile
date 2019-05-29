import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dimensions, StyleSheet, LayoutAnimation } from 'react-native';

import {
  Card,
  CardItem,
  Text,
  View,
} from 'native-base';

import _ from 'lodash';

import { getLanguage } from 'lib/i18n';
import CandidateSet from './CandidateSet';
import HorizontalPicker from 'lib/HorizontalPicker';
import nbVariables from 'lib/native-base-theme/variables/platform';

const lang = getLanguage();
const disjunctionWidth = Dimensions.get('window').width - 24;

export default class Disjunction extends Component {

  static propTypes = {
    candidateSets: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    choice: PropTypes.number,
    hideUnchosen: PropTypes.bool,
    label: PropTypes.object,
    makeDisclosureChoice: PropTypes.func,
  }

  static defaultProps = {
    choice: 0,
    hideUnchosen: false,
    label: null,
    makeDisclosureChoice: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      height: this.candidateSetHeight(props.candidateSets[props.choice]),
    };
  }

  renderCandidateSet = (candidateSet, index) => {
    const {
      hideUnchosen,
      choice,
    } = this.props;
    const { height } = this.state;

    // Decide if this candidate set (un)selected and maybe not displayed
    const isSelected = index === choice;
    if (hideUnchosen && !isSelected)
      return null;

    return (
      <View key={index} style={{width: disjunctionWidth}}>
        <CandidateSet
          candidateSet={candidateSet}
          height={height}
          width={disjunctionWidth}
        />
      </View>
    );
  }

  checkHeight = j => {
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
      hideUnchosen,
      choice,
    } = this.props;

    const labelHeader = label ?
      <CardItem style={[styles.borderBottom, styles.centerContent]}>
        <Text>
          { label[lang] }
        </Text>
      </CardItem> : undefined;

    const makeChoice = j => {
      makeDisclosureChoice(j);
      this.checkHeight(j);
    };

    if (hideUnchosen && candidateSets[choice].length === 0)
      return null;

    return (
      <Card rounded>
        { labelHeader }
        <HorizontalPicker
          hideUnchosen={hideUnchosen}
          makeChoice={makeChoice}
          width={disjunctionWidth}
        >
          { _.map(candidateSets, this.renderCandidateSet) }
        </HorizontalPicker>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  // General
  borderBottom: {
    borderBottomWidth: nbVariables.borderWidth,
    borderColor: nbVariables.cardBorderColor,
    paddingBottom: 10,
  },
  centerContent: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-around',
  },
});