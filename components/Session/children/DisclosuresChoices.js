import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { StyleSheet } from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import Disjunction from './Disjunction';
import { namespacedTranslation } from 'lib/i18n';

import SessionStyles, { screenWidth } from './Styles';

const t = namespacedTranslation('Session');

export default class DisclosureChoices extends Component {

  static propTypes = {
    hideUnchosen: PropTypes.bool,
    makeDisclosureChoice: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
  }

  static defaultProps = {
    hideUnchosen: false,
  }

  renderDisjunction = ([candidateSets, choice], conjunctionIndex) => {
    const { makeDisclosureChoice, session: { disclosuresLabels } } = this.props;
    const label = disclosuresLabels && disclosuresLabels[conjunctionIndex] ? disclosuresLabels[conjunctionIndex] : null;

    return (
      <Disjunction
        key={conjunctionIndex}
        candidateSets={candidateSets}
        makeDisclosureChoice={j => makeDisclosureChoice(conjunctionIndex, j)}
        choice={choice}
        label={label}
      />
    );
  }

  renderSeparator = (index, count) => {
    if (index === count-1)
      return null;

    return (
      <View key={`sep-${index}`} style={styles.separator}>
        <View style={{...SessionStyles.borderBottom, ...styles.borderBottom}}></View>
        <Text note style={styles.text}>{ t('.and') }</Text>
        <View style={{...SessionStyles.borderBottom, ...styles.borderBottom}}></View>
      </View>
    );
  }

  // When showing disclosed attributes after the session, filter away all unchosen candidate sets
  // from each outer conjunction
  filterUnchosen = ([candidateSets, choice]) => (
    !this.props.hideUnchosen ? [candidateSets, choice] : [[candidateSets[choice]], 0]
  )

  // When showing disclosed attributes after the session, filter away optional outer conjunctions
  // that the user satisfied by sending nothing
  filterEmpty = ([candidateSets, choice]) => !(
    this.props.hideUnchosen && candidateSets[choice] && candidateSets[choice].length === 0
  );

  render() {
    const { session } = this.props;
    const { disclosuresCandidates, disclosureIndices } = session;

    return (
      <View>
        { _.zip(disclosuresCandidates, disclosureIndices)
           .filter(this.filterEmpty)
           .map(this.filterUnchosen)
           .map(this.renderDisjunction)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  borderBottom: {
    borderColor: SessionStyles.header.color,
    marginBottom: 8, width: (screenWidth/2)-60,
  },
  text: {
    color: SessionStyles.header.color,
    paddingHorizontal: 20,
    textTransform: 'uppercase',
  },
  separator: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 7,
  },
});
