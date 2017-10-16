import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'lib/UnwrappedCard';
import {
  CardItem,
  ListItem,
  Text,
  Body,
  Right,
  Radio,
} from 'native-base';

// TODO: Integrate into I18n
const lang = 'en';

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

    const press = () => makeDisclosureChoice(disclosureIndex, candidate.Type, candidate.Hash);
    const isSelected = choice.Type === candidate.Type && choice.Hash === candidate.Hash;

    if(hideUnchosen && !isSelected)
      return null;

    return (
      <ListItem
        key={`${candidate.Type}-${candidate.Hash}`}
        onPress={press}
      >
        <Body>
          <Text>
            { candidate.Issuer.ShortName[lang] } - { candidate.Name[lang] }
          </Text>
          <Text note>
            { candidate.Value[lang] }
          </Text>
        </Body>
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
