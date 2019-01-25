import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Linking } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import Collapsible from 'components/Collapsible';
import ButtonImage from 'components/ButtonImage';

import {
  Button,
  CardItem,
  Text,
  Card,
  View,
  Body,
  Right,
} from 'native-base';

import { CredentialAttributes, CardItemThumb } from './helpers';
import nbVariables from 'lib/native-base-theme/variables/platform';
import { namespacedTranslation, lang } from 'lib/i18n';

import infoCircleIcon from 'streamline/icons/regular/PNG/01-InterfaceEssential/14-Alerts/48w/information-circle.png';
import shareIcon from 'streamline/icons/regular/PNG/01-InterfaceEssential/28-Share/48w/share-3.png';
import deleteIcon from 'streamline/icons/regular/PNG/01-InterfaceEssential/23-Delete/24w/bin-1.png';

const t = namespacedTranslation('CredentialCard');

export default class CredentialCard extends Component {

  static propTypes = {
    credential: PropTypes.object.isRequired,
    isEditable: PropTypes.bool,
    lockMode: PropTypes.oneOf(['unlocked', 'open', 'closed']),
    onDeletePress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPress: PropTypes.func,
    onPressOut: PropTypes.func,
    onReorderPress: PropTypes.func,
    onReorderPressOut: PropTypes.func,
    showActionButtons: PropTypes.bool,
  }

  static defaultProps = {
    isEditable: false,
    lockMode: 'unlocked',
    onDeletePress: () => {},
    onLongPress: () => {},
    onPress: () => {},
    onPressOut: () => {},
    onReorderPress: () => {},
    onReorderPressOut: () => {},
    showActionButtons: true,
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

    this.setState({collapsed: !collapsed, showAdditionalInfo: false});
  }

  additionalInfoPress = () => {
    const { showAdditionalInfo } = this.state;
    this.setState({showAdditionalInfo: !showAdditionalInfo});
  }

  renderHeader() {
    const { credential, isEditable, onDeletePress, onReorderPress, onReorderPressOut } = this.props;
    const { showAdditionalInfo } = this.state;
    const { CredentialType, hasExpired } = credential;

    return (
      <CardItem header style={[styles.headerCardItem, styles.borderBottom]}>
        <Body style={{flex: 2}}>
          <Text style={[styles.credentialNameText, hasExpired ? styles.expiredName : null]}>
            { CredentialType.Name[lang] }
          </Text>
          <Text note>
            { showAdditionalInfo && CredentialType.Attributes.length > 1 ? CredentialType.Description[lang] :
                t('common.attributes', {count: credential.Attributes.length})
            }
          </Text>
        </Body>
        <Right style={{flex: 1}}>
          { isEditable ?
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={onDeletePress}
              >
                <ButtonImage source={deleteIcon} style={{width: 28, height: 28, marginTop: 6}} />
              </TouchableWithoutFeedback>

              {/* <TouchableWithoutFeedback
                onLongPress={() => {console.log('got reorder longpress'); onReorderPress();}}
                onPressOut={() => {console.log('got reorder out'); onReorderPressOut();}}
              >
                <Icon
                  name="ios-reorder"
                  style={styles.reorderIcon}
                />
              </TouchableWithoutFeedback> */}
            </View> :
            <View style={{flex: 1, paddingTop: 4}}>
              <CardItemThumb source={{uri: CredentialType.logoUri}} />
            </View>
          }
        </Right>
      </CardItem>
    );
  }

  renderIssuer() {
    const { credential } = this.props;
    const { hasExpired, Expires, Issuer } = credential;

    return (
      <CardItem style={styles.issuerDiv}>
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
    );
  }

  renderCredentialDescription() {
    const { credential } = this.props;

    return (
      <CardItem>
        <Text>
          { credential.CredentialType.Description[lang] }
        </Text>
      </CardItem>
    );
  }

  renderAttributes() {
    const { credential } = this.props;
    const { showAdditionalInfo } = this.state;

    return (
      <CredentialAttributes
        credential={credential}
        showDescription={showAdditionalInfo}
        style={[styles.borderBottom]}
      />
    );
  }

  renderActionButtons() {
    const { credential, showActionButtons } = this.props;
    const { showAdditionalInfo } = this.state;
    const { IssueURL } = credential.CredentialType;

    if (!showActionButtons)
      return null;

    return (
      <View style={[styles.actionButtonsView, styles.borderTop]}>
        <Button
          transparent iconLeft dark
          style={[styles.actionButton, styles.actionButtonBorderRight]}
          onPress={this.additionalInfoPress}
        >
          <ButtonImage source={infoCircleIcon} />
          <Text>{ showAdditionalInfo ? t('.lessInfo') : t('.moreInfo') }</Text>
        </Button>
        { !IssueURL ? null :
        <Button
          transparent iconLeft dark
          style={styles.actionButton}
          onPress={() => Linking.openURL(IssueURL[lang])}
        >
          <ButtonImage source={shareIcon} />
          <Text>{ t('.refresh') }</Text>
        </Button>
        }
      </View>
    );
  }

  render() {
    const { onLongPress, onPressOut } = this.props;
    const { collapsed, showAdditionalInfo } = this.state;

    return (
      <TouchableOpacity
        onPress={this.cardPress}
        onLongPress={onLongPress}
        onPressOut={onPressOut}
        activeOpacity={0.6}
      >
        <Card rounded>
          { this.renderHeader() }
          <Collapsible collapsed={collapsed} extraData={showAdditionalInfo}>
            {/* <Collapsible collapsed={!showAdditionalInfo}>
              { this.renderCredentialDescription() }
            </Collapsible> */}
            { this.renderAttributes() }
          </Collapsible>
          { this.renderIssuer() }
          <Collapsible collapsed={collapsed} extraData={showAdditionalInfo}>
            { this.renderActionButtons() }
          </Collapsible>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // General
  borderTop: {
    borderTopWidth: nbVariables.borderWidth,
    borderColor: nbVariables.cardBorderColor,
    marginTop: 3,
  },
  borderBottom: {
    borderBottomWidth: nbVariables.borderWidth,
    borderColor: nbVariables.cardBorderColor,
    marginBottom: 3,
  },
  expiredText: {
    color: '#a7a7a7',
  },

  // Header
  headerCardItem: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  credentialNameText: {
    color: nbVariables.colors.logoBlue,
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

  // Issuer
  issuerCardItem: {
    borderBottomWidth: nbVariables.borderWidth,
    borderColor: nbVariables.cardBorderColor,
  },
  expiredExpiry: {
    color: '#d72020',
  },

  // Action buttons
  actionButtonsView: {
    flex: 1,
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
  },
  actionButtonBorderRight: {
    borderRightWidth: nbVariables.borderWidth,
    borderColor: nbVariables.cardBorderColor,
    borderRadius: 0,
  },
  actionButtonIcon: {
    fontSize: 30,
  },
});