import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dimensions, StyleSheet, LayoutAnimation } from 'react-native';

import {
  Card,
  CardItem,
  Right,
  Text,
  Body,
  View,
} from 'native-base';

import _ from 'lodash';

import { getLanguage } from 'lib/i18n';
import { CardItemThumb } from 'components/CredentialCard/helpers';
import HorizontalPicker from 'lib/HorizontalPicker';
import nbVariables from 'lib/native-base-theme/variables/platform';

const lang = getLanguage();
const disjunctionWidth = Dimensions.get('window').width - 24;

export default class Disjunction extends Component {

  static propTypes = {
    candidateSets: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    choice: PropTypes.number,
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

  constructor(props) {
    super(props);

    this.state = {
      height: this.candidateSetHeight(props.candidateSets[props.choice]),
    };
  }

  renderCandidateSet = (candidateSet, index) => {
    const {
      hideUnchosen,
      choice,
    } = this.props;
    const { height } = this.state;

    // Decide if this candidate set (un)selected and maybe not displayed
    const isSelected = index === choice;
    if (hideUnchosen && !isSelected)
      return null;

    let count = 0;

    const renderHeader = (attrType) => {
      count++;
      if (count > height) return null;

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

    const renderAttribute = (attribute, id) => {
      count++;
      if (count > height) return null;

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

    const renderBorder = () => {
      if (count > height) return null;
      return <View style={{...styles.borderBottom, width: disjunctionWidth}}></View>;
    };

    const renderCredentialSubset = (credSubset) => {
      return (
        <View key={credSubset[0].CredentialType.fullID}>
          { renderHeader(credSubset[0]) }
          { credSubset.map(renderAttribute) }
          { renderBorder() }
        </View>
      );
    };

    return (
      <View key={index} style={{width: disjunctionWidth}}>
        { candidateSet.map(renderCredentialSubset) }
      </View>
    );
  }

  checkHeight = j => {
    const newHeight = this.candidateSetHeight(this.props.candidateSets[j]);
    if (newHeight !== this.state.height) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({height: newHeight});
    }
  }

  candidateSetHeight = candidateSet =>
    candidateSet.length + candidateSet.map(s => s.length).reduce((a, b) => a+b, 0);

  render() {
    const {
      label,
      candidateSets,
      makeDisclosureChoice,
      hideUnchosen,
    } = this.props;

    const labelHeader = label ?
      <CardItem style={[styles.borderBottom, styles.centerContent]}>
        <Text>
          { label[lang] }
        </Text>
      </CardItem> : undefined;

    const makeChoice = j => {
      makeDisclosureChoice(j);
      this.checkHeight(j);
    };


    return (
      <Card rounded>
        { labelHeader }
        <HorizontalPicker
          hideUnchosen={hideUnchosen}
          makeChoice={makeChoice}
          width={disjunctionWidth}
        >
          { _.map(candidateSets, this.renderCandidateSet) }
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
  centerContent: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-around',
  },
});