import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Linking, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Collapsible from 'components/Collapsible';

import {
  Button,
  CardItem,
  Icon,
  // Text,
  Card,

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
    onDeletePress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPress: PropTypes.func,
    onPressOut: PropTypes.func,
    onReorderPress: PropTypes.func,
    onReorderPressOut: PropTypes.func,
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
    // setTimeout(() => this.setState({collapsed: !collapsed}), 1);
    // setTimeout(() => this.setState({collapsed: collapsed}), 2);
  }

  renderHeader() {
    const { credential, isEditable, onDeletePress, onReorderPress, onReorderPressOut } = this.props;
    const { CredentialType, hasExpired } = credential;

    return (
      <CardItem header style={[styles.headerDiv, styles.borderBottom]}>
        <Body style={{flex: 2}}>
          <Text style={[styles.credentialNameText, hasExpired ? styles.expiredName : null]}>
            { CredentialType.Name[lang] }
          </Text>
          <Text note>
            { t('common.attributes', {count: credential.Attributes.length}) }
          </Text>
        </Body>
        <Right style={{flex: 1}}>
          { isEditable ?
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
                onLongPress={() => {console.log('got reorder longpress'); onReorderPress();}}
                onPressOut={() => {console.log('got reorder out'); onReorderPressOut();}}
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

  renderIssuer() {
    const { credential } = this.props;
    const { hasExpired, Expires, Issuer } = credential;

    return (
      <CardItem style={[styles.issuerDiv, styles.borderBottom]}>
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

    // <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
    //   <View style={{flex: 1.5}} />
    //   <Button transparent iconLeft dark style={{flex: 1}}>
    //     <Icon type="MaterialCommunityIcons" name="information-outline" style={styles.actionButtonIcon} />
    //   </Button>
    //   <Button transparent iconLeft dark style={{flex: 1}}>
    //     <Icon type="MaterialCommunityIcons" name="web" style={styles.actionButtonIcon} />
    //   </Button>
    //   <Button transparent iconLeft dark style={{flex: 1}}>
    //     <Icon type="FontAwesome" name="trash-o" style={styles.actionButtonIcon} />
    //   </Button>
    //   <View style={{flex: 2}} />
    // </View>
  }

  renderAttributes() {
    const { credential } = this.props;
    const { showAdditionalInfo } = this.state;

    return (
      <CredentialAttributes
        credential={credential}
        showDescription={showAdditionalInfo}
        style={styles.borderBottom}
      />
    );
  }

  renderActionButtons() {
    return (
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
    );
  }

  render() {
    const { onLongPress, onPressOut } = this.props;
    const { collapsed, showAdditionalInfo } = this.state;

    return (
      <TouchableOpacity
        onPressIn={() => console.log('got card press in')}
        onPress={() => {console.log('got card press'); this.cardPress()}}
        onLongPress={() => {console.log('got card longpress'); onLongPress()}}
        onPressOut={() => {console.log('got card pressout'); onPressOut()}}
        activeOpacity={0.6}
      >
        <Card rounded>
          <TouchableWithoutFeedback onPress={() => this.setState({showAdditionalInfo: true})}>
          { this.renderHeader() }
          </TouchableWithoutFeedback>
          { this.renderIssuer() }
          <Collapsible collapsed={collapsed}>
            {/* <View key={showAdditionalInfo.toString()}> */}
            <View style={{flex: 1}}>
              <Text>{ showAdditionalInfo ? 'this and that and such and so and this and that and such and so and this and that and such and so and this and that and such and so' : 'Hello world!' }</Text>

              {/* { this.renderAttributes() }
              { this.renderActionButtons() } */}
            </View>
          </Collapsible>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // General
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

  // Issuer
  issuerCardItem: {
    borderBottomWidth: nbVariables.borderWidth,
    borderBottomColor: nbVariables.cardBorderColor,
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
    borderRightColor: nbVariables.cardBorderColor,
    borderRadius: 0,
  },
  actionButtonIcon: {
    fontSize: 30,
  },
});