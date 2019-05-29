import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet } from 'react-native';
import {
  CardItem,
  Right,
  Text,
  Body,
  View,
} from 'native-base';

import { getLanguage, namespacedTranslation } from 'lib/i18n';
import { CardItemThumb } from 'components/CredentialCard/helpers';
import nbVariables from 'lib/native-base-theme/variables/platform';

const t = namespacedTranslation('Session.Disjunction');
const lang = getLanguage();

export default class CandidateSet extends Component {

  static propTypes = {
    candidateSet: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  renderHeader = (attrType, count) => {
    count.c++;
    if (count.c > this.props.height) return null;

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
  };

  renderAttribute = (count) => (attribute, id) => {
    count.c++;
    if (count.c > this.props.height) return null;

    const note = attribute.Value ? <Text note>{ attribute.AttributeType.Name[lang] }</Text> : null;
    const text = attribute.Value ? attribute.Value[lang] : attribute.AttributeType.Name[lang];

    return (
      <CardItem key={id}>
        <Body>
          { note }
          <Text style={{fontWeight: 'normal'}}>
            { text }
          </Text>
        </Body>
      </CardItem>
    );
  };

  renderBorder = (count) => {
    const { height, width } = this.props;
    if (count.c > height) return null;
    return <View style={{...styles.borderBottom, width}}></View>;
  };

  renderCredentialSubset = (count) => (credSubset) => {
    return (
      <View key={credSubset[0].CredentialType.fullID}>
        { this.renderHeader(credSubset[0], count) }
        { credSubset.map(this.renderAttribute(count)) }
        { this.renderBorder(count) }
      </View>
    );
  };

  renderEmptyConjunction = (count) => {
    count.c++;
    return (
      <View>
        <CardItem>
          <Body style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <View>
              <Text>{ t('.emptyConjunction') }</Text>
              <Text note>{ t('.emptyConjunctionNote') }</Text>
            </View>
          </Body>
        </CardItem>
        { this.renderBorder(count) }
      </View>
    );
  };

  render() {
    const { candidateSet } = this.props;

    const count = { c: 0 };
    return (
      <View>
        { candidateSet.length !== 0 ?
            candidateSet.map(this.renderCredentialSubset(count)) :
            this.renderEmptyConjunction(count) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
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