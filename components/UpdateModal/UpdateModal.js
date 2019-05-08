import React, { Component } from 'react';
import { Linking, Platform, BackHandler } from 'react-native';
import IconCard from 'components/IconCard';
import { namespacedTranslation } from 'lib/i18n';
import {
  Container,
  Text,
  Button,
} from 'native-base';
import PaddedContent from 'lib/PaddedContent';
import { Navigation } from 'lib/navigation';

const t = namespacedTranslation('UpdateModal');

export default class UpdateModal extends Component {
  static options = {
    topBar: {
      leftButtons: {
        id: 'logo',
        // Android needs extra padding for the icon, so hackily insert padding by using a different image
        icon: Platform.OS === 'ios' ? require('assets/irmaLogoAppUnlock.png') : require('assets/irmaLogoAppUnlockAndroid.png'),
      },
      title: {
        text: t('.title'),
      },
    },
    layout: {
      backgroundColor: 'transparent',
    },
    modalPresentationStyle: Platform.OS === 'ios' ? 'overFullScreen' : 'overCurrentContext',
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  // Disable backpress on this screen
  componentDidAppear() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentDidDisappear() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => true

  linkUpdate = () => {
    if (Platform.OS === 'ios')
      Linking.openURL('itms://itunes.apple.com/us/app/apple-store/id1294092994?mt=8');
     else
      Linking.openURL('market://details?id=org.irmacard.cardemu');

  }

  render() {
    return (
      <Container>
        <PaddedContent>
          <IconCard iconName="alert">
            <Text>{t('.outofdate')}</Text>
            <Button onPress={this.linkUpdate}><Text>{t('.update')}</Text></Button>
          </IconCard>
        </PaddedContent>
      </Container>
    );
  }
}
