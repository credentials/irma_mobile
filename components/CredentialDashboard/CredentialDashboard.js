import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';

import { namespacedTranslation, lang } from 'lib/i18n';
import PaddedContent from 'lib/PaddedContent';

import CredentialCard from 'components/CredentialCard';
import Container from 'components/Container';
import ButtonImage from 'components/ButtonImage';
import HeaderButton from 'components/HeaderButton';

import registerIcon from 'assets/icons/streamline-regular/17/13/single-neutral-actions-add.png';
import qrScannerIcon from 'assets/icons/streamline-light/20/08/qr-code-scan.png';
import menuIcon from 'assets/icons/streamline-regular/01/03/navigation-menu.png';
import lockIcon from 'assets/icons/streamline-regular/01/11/lock-1.png';

import {
  Button,
  Footer,
  H3,
  Text,
  View,
} from 'native-base';

const t = namespacedTranslation('CredentialDashboard');
export const headerTitle = t('.title');

export const MenuButton = ({ onPress }) =>
  <HeaderButton onPress={onPress} source={menuIcon} />;

export const LockButton = ({ onPress }) =>
  <HeaderButton onPress={onPress} source={lockIcon} />;

export const DoneButton = ({ onPress }) =>
  <HeaderButton onPress={onPress} text={t('.done')} />;

export default class CredentialDashboard extends Component {

  static propTypes = {
    credentials: PropTypes.array.isRequired,
    deleteCredential: PropTypes.func.isRequired,
    isEditable: PropTypes.bool.isRequired,
    shouldEnroll: PropTypes.bool.isRequired,
    makeEditable: PropTypes.func.isRequired,
    makeUneditable: PropTypes.func.isRequired,
    navigateToEnrollment: PropTypes.func.isRequired,
    navigateToQRScanner: PropTypes.func.isRequired,
  }

  showDeleteCredentialDialog(credential) {
    const { deleteCredential } = this.props;
    const credentialName = credential.CredentialType.Name[lang];

    Alert.alert(
      t('.deleteCredential.title', {credentialName}),
      t('.deleteCredential.message', {credentialName}),
      [
        {text: t('.deleteCredential.cancel'), style: 'cancel'},
        {text: t('.deleteCredential.ok'), onPress: () => deleteCredential(credential)},
      ],
      { cancelable: true }
    );
  }

  renderEnrollButton() {
    const { navigateToEnrollment } = this.props;

    const buttonStyle = {alignSelf: 'center', borderRadius: 0, paddingHorizontal: 10};

    return (
      <View style={{paddingTop: 60}}>
        <Button iconLeft primary onPress={navigateToEnrollment} style={buttonStyle}>
          <ButtonImage source={registerIcon} style={{tintColor: 'white'}} />
          <Text style={{color: 'white'}}>{ t('.unenrolled.button') }</Text>
        </Button>
      </View>
    );
  }

  renderNoCredentialsHint() {
    const { credentials, shouldEnroll } = this.props;
    if (credentials.length !== 0)
      return null;

    const status = shouldEnroll ? 'unenrolled' : 'noAttributes';

    return (
      <View key="title" style={{alignItems: 'center'}}>
        <H3 style={{paddingTop: 30, color: '#888888'}}>
          { t(`.${status}.header`) }
        </H3>
        <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
          <Text style={{paddingTop: 30, color: '#888888'}}>
            { t(`.${status}.text`) }
          </Text>
          { shouldEnroll ? this.renderEnrollButton() : null }
        </View>
      </View>
    );
  }

  renderCredentials() {
    const {
      credentials,
      makeEditable,
      isEditable,
    } = this.props;

    const sortedCredentials = credentials.sort((a,b) => {
      if (a.SignedOn > b.SignedOn) {
        return -1;
      }
      if (a.SignedOn < b.SignedOn) {
        return +1;
      }
      if (a.CredentialType.fullID < b.CredentialType.fullID) {
        return -1;
      }
      if (a.CredentialType.fullID > b.CredentialType.fullID) {
        return +1;
      }
      if (a.Hash < b.Hash) {
        return -1;
      }
      if (a.Hash > b.Hash) {
        return +1;
      }
      return 0;
    });

    return sortedCredentials.map( credential =>
      <CredentialCard
        key={credential.Hash}
        credential={credential}
        isEditable={isEditable}
        onDeletePress={() => this.showDeleteCredentialDialog(credential)}
        onLongPress={makeEditable}
      />
    );
  }

  renderScanQRButton() {
    const { shouldEnroll, navigateToQRScanner } = this.props;

    return (
      <Button
        style={{alignSelf: 'center'}}
        testID="scanQRButton"
        primary={!shouldEnroll}
        light={shouldEnroll}
        onPress={navigateToQRScanner}
        iconLeft
      >
        <ButtonImage style={{tintColor: 'white'}} source={qrScannerIcon} />
        <Text>{ t('.scanQRCode') }</Text>
      </Button>
    );
  };

  renderMakeUneditableButton() {
    const { makeUneditable } = this.props;

    return (
      <Button
        style={{alignSelf: 'center'}}
        primary
        onPress={makeUneditable}
      >
        <Text>{ t('.done') }</Text>
      </Button>
    );
  }

  renderFooter() {
    const { isEditable } = this.props;

    return (
      <Footer style={{paddingVertical: 10}}>
        { isEditable ? this.renderMakeUneditableButton() : this.renderScanQRButton() }
      </Footer>
    );
  }

  render() {
    return (
      <Container testID="CredentialDashboard">
        <PaddedContent>
          { this.renderNoCredentialsHint() }
          { this.renderCredentials() }
        </PaddedContent>

        { this.renderFooter() }
      </Container>
    );
  }
}
