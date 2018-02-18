import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground } from 'react-native';

import {
  Button,
  Text,
  Content,
  View,
} from 'native-base';

import passportImage from './passport.jpg';
import shopImage from './shop.jpg';
import authImage from './auth.jpg';

import Swiper from 'react-native-swiper';

export default class Teaser extends Component {

  static propTypes = {
    dismissEnrollment: PropTypes.func.isRequired,
    dismissTeaser: PropTypes.func.isRequired,
  }

  renderFooter() {
    const { dismissEnrollment, dismissTeaser } = this.props;

    const footerStyle = {
      height: 100,
      flexDirection: 'row',
      justifyContent: 'center',
    };

    return (
      <View {...footerStyle} style={{}}>
        <Button info onPress={dismissEnrollment} style={{marginTop: 5, marginRight: 20}}>
          <Text>Demo</Text>
        </Button>
        <Button info onPress={dismissTeaser} style={{marginTop: 5}}>
          <Text>Register</Text>
        </Button>
      </View>
    );
  }

  renderTexts(statement, quote) {
    const statementStyle = {
      color: '#305f91',
      fontSize: 26,
      fontWeight: '300',
      marginTop: 40,
      paddingHorizontal: 20,
    };

    const quoteStyle = {
      color: '#ffffff',
      fontFamily: 'Times New Roman',
      fontSize: 30,
      fontStyle: 'italic',
      fontWeight: '800',
      marginTop: 30,
      paddingHorizontal: 20,
      textAlign: 'right',
    };

    return (
      <Content>
        <Text style={statementStyle}>{ statement }</Text>
        <Text style={quoteStyle}>{ quote }</Text>
      </Content>
    );
  }

  render() {
    return (
      <Swiper>
        <ImageBackground
          imageStyle={{marginTop: 300}}
          source={passportImage}
          style={{flex: 1, backgroundColor: '#2dbfce'}}
        >
          { this.renderTexts(
              'IRMA is like a digital passport on your phone. It puts you in control and keeps your personal details private and secure.',
              '"I reveal my attributes"'
          )}
          { this.renderFooter() }
        </ImageBackground>
        <ImageBackground
          imageStyle={{marginTop: 100}}
          source={shopImage}
          style={{flex: 1, backgroundColor: '#abe3f4'}}
        >
          { this.renderTexts(
              'Reveal what\'s relevant – and nothing more',
              '"I\'m older than 18"'
          )}
          { this.renderFooter() }
        </ImageBackground>
        <ImageBackground
          imageStyle={{marginTop: 100}}
          source={authImage}
          style={{flex: 1, backgroundColor: '#65b7cc'}}
        >
          { this.renderTexts(
              'Prove it\'s you, gain access, forget passwords...',
              '"It\'s me, log me in!"'
          )}
          { this.renderFooter() }
        </ImageBackground>
      </Swiper>
    );
  }
}
