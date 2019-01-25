import React, { Component } from 'react';
import { TouchableWithoutFeedback, StyleSheet, Linking } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';

import {
  Button,
  CardItem,
  Icon,
  Text,
  Card,
  View,
  Body,
  Right,
} from 'native-base';

import { CredentialAttributes, CardItemThumb } from './helpers';
import nbVariables from 'lib/native-base-theme/variables/platform';
import { namespacedTranslation, lang } from 'lib/i18n';

const t = namespacedTranslation('CredentialCard');

export default class CredentialCard extends Component {

  static propTypes = {
    credential: PropTypes.object.isRequired,
    lockedOpen: PropTypes.bool,
  }

  static defaultProps = {
    lockedOpen: false,
  }

  state = {
    // Unless locked open, the collapsable is default closed on mount
    collapsed: !this.props.lockedOpen,
    showAdditionalInfo: false,
  }

  cardPress = () => {
    const { lockedOpen } = this.props;
    const { collapsed } = this.state;

    if (lockedOpen)
      return;

    this.setState({collapsed: !collapsed});
  }

  additionalInfoPress = () => {
    const { showAdditionalInfo, collapsed } = this.state;
    this.setState({showAdditionalInfo: !showAdditionalInfo});

    // TODO: Remove this very dirty hack to solve an issue with Collapsible not rendering properly
    setTimeout(() => this.setState({collapsed: !collapsed}), 1);
    setTimeout(() => this.setState({collapsed: collapsed}), 2);
  }

  isCollapsed() {
    const { lockedOpen } = this.props;
    const { collapsed } = this.state;

    return !lockedOpen && collapsed;
  }

  renderHeader() {
    const { credential } = this.props;
    const { CredentialType, hasExpired } = credential;

    return (
      <CardItem header style={styles.cardItemBorderBottom}>
        <Body>
          <Text style={[styles.credentialName, hasExpired ? styles.expiredName : null]}>
            { CredentialType.Name[lang] }
          </Text>
          <Text note>
            { t('common.attributes', {count: credential.Attributes.length}) }
          </Text>
        </Body>
        <Right>
          <CardItemThumb source={{uri: CredentialType.logoUri}} />
        </Right>
      </CardItem>
    );
  }

  renderFooter() {
    const { credential } = this.props;
    const { hasExpired, Expires, Issuer } = credential;

    return (
      <View>
        <CardItem>
          <Body>
            <Text style={hasExpired ? styles.expiredText : null}>
              { t('.issuedBy') }: { Issuer.Name[lang] }
            </Text>
            <Text note style={hasExpired ? styles.expiredExpiry : null}>
              { hasExpired ? t('.expired') : t('.expires') }
              { ' ' }{ moment.unix(Expires).format('D MMM YYYY') }
            </Text>
          </Body>
        </CardItem>
        <Collapsible collapsed={this.isCollapsed()}>
          <View style={styles.actionButtonsView}>
            <Button
              transparent iconLeft dark
              style={[styles.actionButton, styles.actionButtonBorderRight]}
              onPress={this.additionalInfoPress}
            >
              <Icon type="MaterialCommunityIcons" name="information-outline" style={styles.actionButtonIcon} />
              <Text>More info</Text>
            </Button>
            <Button
              transparent iconLeft dark
              style={styles.actionButton}
              onPress="https://privacybydesign.foundation" // TODO
            >
              <Icon type="MaterialCommunityIcons" name="web" style={styles.actionButtonIcon} />
              <Text>Website</Text>
            </Button>

          </View>
        </Collapsible>

        {/*
          <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
            <View style={{flex: 1.5}} />
            <Button transparent iconLeft dark style={{flex: 1}}>
              <Icon type="MaterialCommunityIcons" name="information-outline" style={styles.actionButtonIcon} />
            </Button>
            <Button transparent iconLeft dark style={{flex: 1}}>
              <Icon type="MaterialCommunityIcons" name="web" style={styles.actionButtonIcon} />
            </Button>
            <Button transparent iconLeft dark style={{flex: 1}}>
              <Icon type="FontAwesome" name="trash-o" style={styles.actionButtonIcon} />
            </Button>
            <View style={{flex: 2}} />
          </View>*/}
      </View>
    );
  }

  render() {
    const { credential } = this.props;
    const { showAdditionalInfo } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.cardPress} onLongPress={() => { /* TODO */ }}>
        <Card rounded>
          { this.renderHeader() }
          <Collapsible collapsed={this.isCollapsed()}>
            <CredentialAttributes
              credential={credential}
              style={styles.cardItemBorderBottom}
              showDescription={showAdditionalInfo}
            />
          </Collapsible>
          { this.renderFooter() }
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  // General
  cardItemBorderBottom: {
    borderBottomWidth: nbVariables.borderWidth,
    borderColor: nbVariables.cardBorderColor,
    marginBottom: 3,
  },
  expiredText: {
    color: '#a7a7a7',
  },

  // Header
  credentialName: {
    color: nbVariables.irmaColors.darkBlue,
    fontFamily: nbVariables.titleFontfamily,
    fontWeight: 'bold',
  },

  // Footer
  expiredExpiry: {
    color: '#d72020',
  },
  actionButtonsView: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: nbVariables.borderWidth,
    borderTopColor: nbVariables.cardBorderColor,
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
  },
  actionButtonBorderRight: {
    borderRightWidth: nbVariables.borderWidth,
    borderRightColor: nbVariables.cardBorderColor,
    borderRadius: 0,
  },
  actionButtonIcon: {
    fontSize: 30,
  },
});