import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  View,
} from 'native-base';

import Disjunction from './Disjunction';

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

  render() {
    const { session } = this.props;
    const { disclosuresCandidates, disclosureIndices } = session;

    return (
      <View>
        { _.zip(disclosuresCandidates, disclosureIndices)
           .map(this.renderDisjunction)
        }
      </View>
    );
  }
}
