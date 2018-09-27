import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'lib/UnwrappedCard';
import { getLanguage, namespacedTranslation } from 'lib/i18n';
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
const t = namespacedTranslation('Session.DisclosureChoice');

export default class DisclosureChoice extends Component {

  static propTypes = {
    candidates: PropTypes.array.isRequired,
    choice: PropTypes.object,
    disclosure: PropTypes.object.isRequired,
    disclosureIndex: PropTypes.number.isRequired,
    hideUnchosen: PropTypes.bool,
    makeDisclosureChoice: PropTypes.func.isRequired,
  }

  renderNoneCandidate() {
    const {
      choice,
      disclosureIndex,
      hideUnchosen,
      makeDisclosureChoice,
    } = this.props;

    const press = () => makeDisclosureChoice(disclosureIndex, null);
    const isSelected = !choice;

    if (hideUnchosen && !isSelected)
      return null;

    return (
      <ListItem
        key={'nillCandidate'}
        onPress={press}
      >
        <Left>
          <Body>
            <Text style={{fontWeight:'normal'}}>
              { t('.none') }
            </Text>
          </Body>
        </Left>
        <Right>
          <Radio selected={isSelected} />
        </Right>
      </ListItem>
    );
  }

  renderCandidate(candidate) {
    const {
      choice,
      disclosureIndex,
      hideUnchosen,
      makeDisclosureChoice,
    } = this.props;

    const press = () => makeDisclosureChoice(disclosureIndex, candidate);
    const isSelected = choice && choice.Type === candidate.Type && choice.CredentialHash === candidate.CredentialHash;

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

    if (candidates.length === 0)
      return null;

    return (
      <Card>
        <CardItem>
          <Text style={{fontWeight: 'bold'}}>{ disclosure.label }: </Text>
          {disclosure.optional ? <Text>{ t('.optional') }</Text> : null}
        </CardItem>
        { disclosure.optional ? this.renderNoneCandidate() : null }
        { candidates.map(::this.renderCandidate) }
      </Card>
    );
  }
}
