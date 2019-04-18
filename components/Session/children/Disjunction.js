import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dimensions, StyleSheet } from 'react-native';

import {
  Card,
  CardItem,
  Right,
  Text,
  Body,
  View,
} from 'native-base';

import { getLanguage } from 'lib/i18n';
import { CardItemThumb } from 'components/CredentialCard/helpers';
import HorizontalPicker from 'lib/HorizontalPicker';
import nbVariables from 'lib/native-base-theme/variables/platform';

const lang = getLanguage();
const disjunctionWidth = Dimensions.get('window').width - 24;

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

  groupIntoCredentials = candidateSet => Object.values(
    candidateSet.reduce((grouped, candidate) =>
      ({
        ...grouped,
        [candidate.CredentialType.fullID]: Object.assign([],
          grouped[candidate.CredentialType.fullID]).concat([candidate]),
      }), {})
    )

  renderAttribute = (attribute, index) => {
    return (
      <CardItem key={index}>
        <Body>
          <Text note>
            { attribute.AttributeType.Name[lang] }
          </Text>
          <Text style={{fontWeight: 'normal'}}>
            { attribute.Value[lang] }
          </Text>
        </Body>
      </CardItem>
    );
  }

  renderHeader = (attrType) => {
    const credType = attrType.CredentialType;
    return (
      <CardItem key={credType.fullID} header style={styles.headerCardItem}>
        <Body style={{flex: 2}}>
          <Text style={styles.credentialNameText}>
            { credType.Name[lang] }
          </Text>
          <Text note>
            Issued by: { attrType.Issuer.Name[lang] }
          </Text>
        </Body>
        <Right style={{flex: 1}}>
          <View style={{flex: 1, paddingTop: 4}}>
            <CardItemThumb source={{uri: credType.logoUri}} />
          </View>
        </Right>
      </CardItem>
    );
  }

  renderCredentialSubset = (credSubset) => {
    return (
      <View key={credSubset[0].CredentialType.fullID} style={styles.borderBottom}>
        { this.renderHeader(credSubset[0]) }
        { credSubset.map(this.renderAttribute) }
      </View>
    );
  }

  renderCandidateSet = (candidateSet, index) => {
    const {
      hideUnchosen,
      choice,
    } = this.props;

    // Decide if this candidate set (un)selected and maybe not displayed
    const isSelected = index === choice;
    if (hideUnchosen && !isSelected)
      return null;

    return (
      <View key={index} style={{width: disjunctionWidth}}>
        { this.groupIntoCredentials(candidateSet).map(this.renderCredentialSubset) }
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
      <Card rounded>
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

const styles = StyleSheet.create({
  // General
  borderBottom: {
    borderBottomWidth: nbVariables.borderWidth,
    borderColor: nbVariables.cardBorderColor,
    paddingBottom: 10,
  },
  headerCardItem: {
    paddingTop: 12,
    paddingBottom: 0,
  },
  credentialNameText: {
    color: nbVariables.colors.logoBlue,
    fontFamily: nbVariables.titleFontfamily,
    fontWeight: 'bold',
  },
});