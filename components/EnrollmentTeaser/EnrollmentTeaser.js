import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground } from 'react-native';

import {
  Button,
  Text,
  Content,
  View,
} from 'native-base';

import passportImage from './children/passport.jpg';
import shopImage from './children/shop.jpg';
import authImage from './children/auth.jpg';

import Swiper from 'react-native-swiper';

export default class EnrollmentTeaser extends Component {

  static propTypes = {
    navigateToEnrollment: PropTypes.func.isRequired,
    navigateBack: PropTypes.func.isRequired,
  }

  renderFooter() {
    const { navigateToEnrollment, navigateBack } = this.props;

    const footerStyle = {
      height: 100,
      flexDirection: 'row',
      justifyContent: 'center',
    };

    return (
      <View {...footerStyle} style={{}}>
        <Button onPress={navigateBack} style={{marginTop: 5, marginRight: 20}}>
          <Text>Demo</Text>
        </Button>
        <Button onPress={navigateToEnrollment} style={{marginTop: 5}}>
          <Text>Open IRMA account</Text>
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
      <Swiper loop={false} showsButtons={true}>
        <ImageBackground
          imageStyle={{marginTop: 300}}
          source={passportImage}
          style={{flex: 1, backgroundColor: '#2dbfce'}}
        >
          { this.renderTexts(
              'IRMA is like a personalized passport stored only on your phone. It puts you in control and keeps your personal data private and secure.',
              '"I Reveal My Attributes"'
          )}
          { this.renderFooter() }
        </ImageBackground>
        <ImageBackground
          imageStyle={{marginTop: 100}}
          source={shopImage} // Can this image be edited to show the wine bottle more prominently, for the >18 use case?
          style={{flex: 1, backgroundColor: '#abe3f4'}}
        >
          { this.renderTexts(
              'IRMA allows you to reveal relevant attributes – and nothing more.',
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
              'IRMA allows you to gain access without passwords.',
              '"It\'s me, log me in!"'
          )}
          { this.renderFooter() }
        </ImageBackground>
      </Swiper>
    );
  }
}
