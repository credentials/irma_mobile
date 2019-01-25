import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Linking } from 'react-native';
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
    isEditable: PropTypes.bool,
    lockMode: PropTypes.oneOf(['unlocked', 'open', 'closed']),
    onLongPress: PropTypes.func,
    onPress: PropTypes.func,
    onPressOut: PropTypes.func,
  }

  static defaultProps = {
    isEditable: false,
    lockMode: 'unlocked',
    onLongPress: () => {},
    onPress: () => {},
    onPressOut: () => {},
  }

  state = {
    // Unless locked open, the collapsable is default closed on mount
    collapsed: this.props.lockMode !== 'open',
    showAdditionalInfo: false,
  }

  componentDidUpdate(prevProps) {
    const { lockMode } = this.props;

    // Make the collapsed state reflect the lockMode, ensuring that after
    // unlocking the card again, the collapsable state is maintained
    if (lockMode !== prevProps.lockMode) {
      if (lockMode === 'closed')
        this.setState({collapsed: true});

      if (lockMode === 'open')
        this.setState({collapsed: false});
    }
  }

  cardPress = () => {
    const { lockMode, onPress } = this.props;
    const { collapsed } = this.state;

    onPress();

    if (lockMode !== 'unlocked')
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

  renderHeader() {
    const { credential, isEditable, onDeletePress, onReorderPress, onReorderPressOut } = this.props;
    const { CredentialType, hasExpired } = credential;

    return (
      <CardItem header style={[styles.headerCardItem, styles.cardItemBorderBottom]}>
        <Body style={{flex: 2}}>
          <Text style={[styles.credentialNameText, hasExpired ? styles.expiredName : null]}>
            { CredentialType.Name[lang] }
          </Text>
          <Text note>
            { t('common.attributes', {count: credential.Attributes.length}) }
          </Text>
        </Body>
        <Right style={{flex: 1}}>
          { isEditable || true ?
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={onDeletePress}
              >
                <Icon
                  name="ios-remove-circle"
                  style={styles.deleteIcon}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onLongPress={() => {console.log('got reorder longpress'); onReorderPress(); }}
                onPressOut={() => {console.log('got reorder out'); onReorderPressOut(); }}
              >
                <Icon
                  name="ios-reorder"
                  style={styles.reorderIcon}
                />
              </TouchableWithoutFeedback>
            </View>
            : <CardItemThumb source={{uri: CredentialType.logoUri}} />
          }
        </Right>
      </CardItem>
    );
  }

  renderFooter() {
    const { credential } = this.props;
    const { collapsed } = this.state;
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
        <Collapsible collapsed={collapsed}>
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
              onPress={() => Linking.openURL('https://privacybydesign.foundation')} // TODO
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
    const { credential, onLongPress, onPressOut } = this.props;
    const { collapsed, showAdditionalInfo } = this.state;

    return (
      <TouchableOpacity
        onPressIn={() => console.log('got card longpress')}
        onPress={() => {console.log('got card press'); this.cardPress()}}
        onLongPress={() => {console.log('got card longpress'); onLongPress()}}
        onPressOut={() => {console.log('got card pressout'); onPressOut()}}
        activeOpacity={0.6}
      >
        <Card rounded>
          { this.renderHeader() }
          <Collapsible collapsed={collapsed}>
            <CredentialAttributes
              credential={credential}
              style={styles.cardItemBorderBottom}
              showDescription={showAdditionalInfo}
            />
          </Collapsible>
          { this.renderFooter() }
        </Card>
      </TouchableOpacity>
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
  headerCardItem: {
    paddingBottom: 8,
  },
  credentialNameText: {
    color: nbVariables.irmaColors.darkBlue,
    fontFamily: nbVariables.titleFontfamily,
    fontWeight: 'bold',
  },
  deleteIcon: {
    color: '#FF3B30',
    fontSize: 28,
    marginTop: 4,
    marginRight: 16,
  },
  reorderIcon: {
    fontSize: 52,
    height: 36,
    lineHeight: 36,
    marginRight: 6,
    marginTop: 8,
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