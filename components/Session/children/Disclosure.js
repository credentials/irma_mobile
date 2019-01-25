import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  CardItem,
  Left,
  ListItem,
  Text,
  Body,
  Right,
  Radio,
  View,
} from 'native-base';

import { getLanguage } from 'lib/i18n';
import { CardItemThumb } from 'components/CredentialCard/helpers';

const lang = getLanguage();

export default class Disclosure extends Component {

  static propTypes = {
    attributes: PropTypes.array.isRequired,
    chosenAttribute: PropTypes.object,
    hideUnchosen: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    chosenAttribute: null,
    hideUnchosen: false,
    onPress: null,
  }

  renderAttributes = (attribute, index) => {
    const {
      hideUnchosen,
      onPress,
      chosenAttribute,
    } = this.props;

    // Decide if this attribute (candidate) is (un)selected and maybe not displayed
    const isSelected = attribute === chosenAttribute;
    if (hideUnchosen && !isSelected)
      return null;

    // Pass back the attribute on press, or null when no onPress is provided (to prevent tap feedback)
    const press = typeof onPress === 'function' ? () => onPress(attribute) : null;

    // TODO: Can we use anything else as key here? (considering both the (single) attribute and candidates)
    return (
      <ListItem
        key={index}
        onPress={press}
        noIndent={true}
      >
        <Left>
          <CardItemThumb source={{uri: attribute.CredentialType.logoUri}} />
          <Body>
            <Text style={{fontWeight: 'normal'}}>
              { attribute.Value[lang] }
            </Text>
            <Text note>
              { attribute.AttributeType.Name[lang] }
            </Text>
          </Body>
        </Left>
        { hideUnchosen ? null : (
          <Right>
            <Radio selected={isSelected} />
          </Right>
        )}
      </ListItem>
    );
  }

  render() {
    const {
      label,
      attributes,
    } = this.props;

    return (
      <View>
        <CardItem>
          <Text style={{fontWeight: 'bold'}}>{ label }:</Text>
        </CardItem>
        { attributes.map(this.renderAttributes) }
      </View>
    );
  }
}
