import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  View
} from 'native-base';

import DisclosureChoice from './DisclosureChoice';

export default class Disclosures extends Component {

  static propTypes = {
    hideUnchosen: PropTypes.bool,
    makeDisclosureChoice: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
  }

  renderChoice([disclosure, candidates, choice], disclosureIndex) {
    const { hideUnchosen, makeDisclosureChoice } = this.props;

    return (
      <DisclosureChoice
        key={`disclosure-${disclosureIndex}`}
        candidates={candidates}
        choice={choice}
        disclosure={disclosure}
        disclosureIndex={disclosureIndex}
        hideUnchosen={hideUnchosen}
        makeDisclosureChoice={makeDisclosureChoice} />
    );
  }

  render() {
    const {
      session: {
        toDisclose, disclosureCandidates, disclosureChoices
      }
    } = this.props;

    return (
      <View>
        { _.zip(toDisclose, disclosureCandidates, disclosureChoices)
           .map(::this.renderChoice)
        }
      </View>
    );
  }
}
