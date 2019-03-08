import React from 'react';
import { Image } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { NativeModules } from 'react-native';
const { IrmaVersion } = NativeModules;

import {
  CardItem,
  H3,
  Text,
} from 'native-base';

import { namespacedTranslation } from 'lib/i18n';
import Card from 'lib/UnwrappedCard';
import PaddedContent from 'lib/PaddedContent';
import Container from 'components/Container';
import irmaLogo from 'assets/irmaLogo.png';

const t = namespacedTranslation('About');

export default class About extends React.Component {

  static options = {
    topBar: {
      title: {
        text: t('.title'),
      },
    },
  }

  render() {
    return (
      <Container>
        <PaddedContent>
          <Hyperlink linkDefault={true} linkStyle={{ color: '#2980b9' }}>
            <Card>
              <CardItem>
                <Image
                  source={irmaLogo}
                  style={{height: 120, position: 'relative', resizeMode: 'contain'}}
                />
              </CardItem>
              <CardItem>
                <H3 style={{textAlign: 'center'}}>
                  { t('.header') }
                </H3>
              </CardItem>
              <CardItem>
                <Text>
                  { t('.about1') }
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  { t('.about2') }
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  { t('.about3') }
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  { t('.problems') }
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  { t('.moreInformation') }
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  { t('.attributions') }
                </Text>
              </CardItem>
              <CardItem>
                <Text>
                  { t('.version') }
                  &nbsp;{ IrmaVersion.version }&nbsp;
                  ({ IrmaVersion.build })
                </Text>
              </CardItem>
            </Card>
          </Hyperlink>
        </PaddedContent>
      </Container>
    );
  }

}
