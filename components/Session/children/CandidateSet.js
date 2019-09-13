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

import { lang, namespacedTranslation } from 'lib/i18n';
import { CardItemThumb } from 'components/CredentialCard/helpers';
import nbVariables from 'lib/native-base-theme/variables/platform';

import SessionStyles from './Styles';

const t = namespacedTranslation('Session.Disjunction');

export default class CandidateSet extends Component {

  static propTypes = {
    candidateSet: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    multiple: PropTypes.bool,
  }

  static defaultProps = {
    multiple: false,
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
    const {
      height,
    } = this.props;

    count.c++;
    if (count.c > height) return null;

    const noValue = !attribute.Missing && attribute.Null ? `: ${t('.noValue')}` : null;
    const note = attribute.Missing && !attribute.Value ? null : <Text note>{ attribute.AttributeType.Name[lang] }{ noValue }</Text>;
    const text = attribute.Value ? <Text>{ attribute.Value[lang] }</Text>
      : (attribute.Missing ? <Text>{ attribute.AttributeType.Name[lang] }</Text> : null);

    return (
      <CardItem key={id}>
        <Body>
          { note }
          { text }
        </Body>
      </CardItem>
    );
  };

  renderBorder = (count) => {
    const { height, width } = this.props;
    if (count.c > height) return null;
    return <View style={{...SessionStyles.borderBottom, paddingBottom: 10, width}}></View>;
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
    const note = this.props.multiple ? <Text note>{ t('.emptyConjunctionNote') }</Text> : null;
    return (
      <View>
        <CardItem>
          <Body style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <View>
              <Text>{ t('.emptyConjunction') }</Text>
              { note }
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