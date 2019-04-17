import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dimensions } from 'react-native';

import {
  Card,
  CardItem,
  Left,
  ListItem,
  Text,
  Body,
  View,
} from 'native-base';

import { getLanguage } from 'lib/i18n';
import { CardItemThumb } from 'components/CredentialCard/helpers';
import HorizontalPicker from 'lib/HorizontalPicker';

const lang = getLanguage();
const disjunctionWidth = Dimensions.get('window').width - 22;

export default class Disjunction extends Component {

  static propTypes = {
    candidateSets: PropTypes.array.isRequired,
    choice: PropTypes.number.isRequired,
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

  renderAttribute = (attribute, index) => {
    return (
      <ListItem
        key={index}
        noIndent={true}
      >
        <Left>
          <CardItemThumb source={{uri: attribute.CredentialType.logoUri}} />
          <Body>
            <Text note>
              { attribute.AttributeType.Name[lang] }
            </Text>
            <Text style={{fontWeight: 'normal'}}>
              { attribute.Value[lang] }
            </Text>
          </Body>
        </Left>
      </ListItem>
    );
  }

  renderCandidateSet = (candidateSet, index) => {
    // Decide if this candidate set (un)selected and maybe not displayed
    const {
      hideUnchosen,
      choice,
    } = this.props;
    const isSelected = index === choice;
    if (hideUnchosen && !isSelected)
      return null;

    return (
      <View
        key={index}
        style={{width: disjunctionWidth}}
      >
        { candidateSet.map(this.renderAttribute) }
      </View>
    );
  }

  render() {
    const {
      label,
      candidateSets,
      choice,
      makeDisclosureChoice,
      hideUnchosen,
    } = this.props;

    const labelText = label ? label[lang] : undefined;

    return (
      <Card>
        { labelText ? <CardItem><Text style={{fontWeight: 'bold'}}>{ labelText }</Text></CardItem> : null }
        <HorizontalPicker
          choice={choice}
          hideUnchosen={hideUnchosen}
          makeChoice={makeDisclosureChoice}
          width={disjunctionWidth}
        >
          { candidateSets.map(this.renderCandidateSet) }
        </HorizontalPicker>
      </Card>
    );
  }
}
