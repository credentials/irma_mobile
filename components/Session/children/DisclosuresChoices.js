import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { Dimensions, StyleSheet } from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import Disjunction from './Disjunction';
import { namespacedTranslation } from 'lib/i18n';
import nbVariables from 'lib/native-base-theme/variables/platform';

const screenWidth = Dimensions.get('window').width;
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
    const { hideUnchosen, makeDisclosureChoice, session: { status, disclosuresLabels } } = this.props;
    const label = disclosuresLabels && disclosuresLabels[conjunctionIndex] ? disclosuresLabels[conjunctionIndex] : null;

    return (
      <Disjunction
        key={conjunctionIndex}
        candidateSets={candidateSets}
        makeDisclosureChoice={status === 'requestPermission' ? j => makeDisclosureChoice(conjunctionIndex, j) : null}
        hideUnchosen={hideUnchosen}
        choice={choice}
        label={label}
      />
    );
  }

  renderSeparator = index => {
    return (
      <View key={`sep-${index}`} style={styles.separator}>
        <View style={styles.borderBottom}></View>
        <Text note style={styles.text}>{ t('.and') }</Text>
        <View style={styles.borderBottom}></View>
      </View>
    );
  }

  render() {
    const { session } = this.props;
    const { disclosuresCandidates, disclosureIndices } = session;

    const count = disclosuresCandidates.length;

    return (
      <View>
        { _.zip(disclosuresCandidates, disclosureIndices)
           .map(this.renderDisjunction)
           .map((disjunction, index) => [disjunction, index === count-1 ? null : this.renderSeparator(index)])
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: nbVariables.borderWidth,
    borderColor: nbVariables.cardBorderColor,
    marginBottom: 8,
    width: (screenWidth/2)-60,
  },
  text: {
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
