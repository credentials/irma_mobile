import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'lib/UnwrappedCard';
import { getLanguage } from 'lib/i18n';
import {
  CardItem,
  Left,
  ListItem,
  Text,
  Body,
  Right,
  Radio,
} from 'native-base';

import CredentialLogo from 'components/CredentialLogo';

const lang = getLanguage();

export default class DisclosureChoice extends Component {

  static propTypes = {
    candidates: PropTypes.array.isRequired,
    choice: PropTypes.object.isRequired,
    disclosure: PropTypes.object.isRequired,
    disclosureIndex: PropTypes.number.isRequired,
    hideUnchosen: PropTypes.bool,
    makeDisclosureChoice: PropTypes.func.isRequired,
  }

  renderCandidate(candidate) {
    const {
      choice,
      disclosureIndex,
      hideUnchosen,
      makeDisclosureChoice,
    } = this.props;

    const press = () => makeDisclosureChoice(disclosureIndex, candidate.Type, candidate.CredentialHash);
    const isSelected = choice.Type === candidate.Type && choice.CredentialHash === candidate.CredentialHash;

    if(hideUnchosen && !isSelected)
      return null;

    return (
      <ListItem
        key={`${candidate.Type}-${candidate.CredentialHash}`}
        onPress={press}
      >
        <Left>
          <CredentialLogo credentialType={candidate.CredentialType} />
          <Body>
            <Text style={{fontWeight: 'normal'}}>
              { candidate.Value[lang] }
            </Text>
            <Text note>
              { candidate.Name[lang] }
            </Text>
          </Body>
        </Left>
        <Right>
          <Radio selected={isSelected} />
        </Right>
      </ListItem>
    );
  }

  render() {
    const {
      candidates,
      disclosure,
    } = this.props;

    return (
      <Card>
        <CardItem>
          <Text style={{fontWeight: 'bold'}}>{ disclosure.label }:</Text>
        </CardItem>
        { candidates.map(::this.renderCandidate) }
      </Card>
    );
  }
}
