import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'lib/UnwrappedCard';
import {
  CardItem,
  Left,
  ListItem,
  Text,
  Body,
  Right,
  Radio,
  Thumbnail,
} from 'native-base';

// TODO: Integrate into I18n
const lang = 'en';
import irmaLogo from 'assets/irmaLogo.png';

export default class DisclosureChoice extends Component {

  static propTypes = {
    candidates: PropTypes.array.isRequired,
    choice: PropTypes.object.isRequired,
    disclosure: PropTypes.object.isRequired,
    disclosureIndex: PropTypes.number.isRequired,
    hideUnchosen: PropTypes.bool,
    makeDisclosureChoice: PropTypes.func.isRequired,
  }

  renderThumbnail(candidate) {
    const source = candidate.Logo !== '' ? {uri: 'file://' + candidate.Logo} : irmaLogo;

    return (
      <Thumbnail square small source={source} resizeMode="contain" />
    );
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
          { this.renderThumbnail(candidate) }
          <Body>
            <Text>
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
