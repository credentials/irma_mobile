import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  Container,
  CardItem,
  H3,
  View,
  Text,
} from 'native-base';
import Hyperlink from 'react-native-hyperlink';
import { namespacedTranslation } from 'lib/i18n';
import Card from 'lib/UnwrappedCard';
import PaddedContent from 'lib/PaddedContent';

import irmaLogo from 'assets/irmaLogo.png';

const t = namespacedTranslation('About');
const homeURL = 'https://privacybydesign.foundation';
const sourceURL = 'https://github.com/privacybydesign';

export default class About extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    title: t('.title'),
  };

  render() {
    return (
      <Container>
        <PaddedContent>
          <Hyperlink linkDefault={true} linkStyle={{ color: '#2980b9' }}>
            <Card>
              <CardItem>
                <Image source={irmaLogo} style={{
                  height: 120,
                  position: 'relative',
                  resizeMode: 'contain',
                }} />
              </CardItem>
              <CardItem>
                <H3 style={{textAlign: 'center'}}>
                  { t('.header') }
                </H3>
              </CardItem>
              <CardItem>
                <Text>
                  { t('.about') }
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  { t('.problems') }
                </Text>
              </CardItem>
              <CardItem>
                <View>
                  <Text>{ t('.more') }:</Text>
                  <Text>{homeURL}</Text>
                  <Text>{ t('.source') }:</Text>
                  <Text>{sourceURL}</Text>
                </View>
              </CardItem>
            </Card>
          </Hyperlink>
        </PaddedContent>
      </Container>
    );
  }

}
