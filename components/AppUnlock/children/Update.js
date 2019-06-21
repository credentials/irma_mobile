import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking, Platform } from 'react-native';
import IconCard from 'components/IconCard';
import { namespacedTranslation } from 'lib/i18n';
import {
  Container,
  Text,
  Button,
  View,
} from 'native-base';
import PaddedContent from 'lib/PaddedContent';

const t = namespacedTranslation('UpdateModal');

export default class UpdateModal extends Component {
  static propTypes = {
    setTopbarTitle: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { setTopbarTitle } = this.props;
    setTopbarTitle(t('.title'));
  }

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
          <IconCard>
            <Text>{t('.outofdate')}</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
              <Button onPress={this.linkUpdate}><Text>{t('.update')}</Text></Button>
            </View>
          </IconCard>
        </PaddedContent>
      </Container>
    );
  }
}
