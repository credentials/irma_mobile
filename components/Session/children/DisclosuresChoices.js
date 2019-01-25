import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  View,
  Card,
} from 'native-base';

import Disclosure from './Disclosure';

export default class DisclosureChoices extends Component {

  static propTypes = {
    hideUnchosen: PropTypes.bool,
    makeDisclosureChoice: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
  }

  static defaultProps = {
    hideUnchosen: false,
  }

  renderChoice = ([disclosure, candidates, choice], disclosureIndex) => {
    const { hideUnchosen, makeDisclosureChoice } = this.props;

    const press = candidate => makeDisclosureChoice(disclosureIndex, candidate.AttributeTypeFullID, candidate.CredentialHash);
    const chosenCandidate = _.find(candidates, candidate =>
      choice.Type === candidate.AttributeTypeFullID && choice.CredentialHash === candidate.CredentialHash
    );

    // TODO: Can we use anything else as key here?
    return (
      <Card key={disclosureIndex}>
        <Disclosure
          attributes={candidates}
          chosenAttribute={chosenCandidate}
          hideUnchosen={hideUnchosen}
          label={disclosure.label}
          onPress={press}
        />
      </Card>
    );
  }

  render() {
    const { session } = this.props;
    const { disclosures, disclosuresCandidates, disclosureChoices } = session;

    return (
      <View>
        { _.zip(disclosures, disclosuresCandidates, disclosureChoices)
           .map(this.renderChoice)
        }
      </View>
    );
  }
}
