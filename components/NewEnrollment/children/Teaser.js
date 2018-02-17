import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground } from 'react-native';

import {
  Button,
  Container,
  Text,
  Footer,
  Content,
  Header,
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

  render() {
    const { dismissEnrollment, dismissTeaser } = this.props;

    const footerStyle = {
      height: 100,
      flexDirection: 'row',
      justifyContent: 'center',
    };

    const body = (
      <Container>
        <Content />
        <View {...footerStyle} style={{}}>
          <Button info onPress={dismissEnrollment} style={{marginTop: 5, marginRight: 20}}>
            <Text>Demo</Text>
          </Button>
          <Button info onPress={dismissTeaser} style={{marginTop: 5}}>
            <Text>Register</Text>
          </Button>
        </View>
      </Container>
    );

    return (
      <Swiper showButtons={false}>
        <ImageBackground style={{flex: 1}} source={passportImage}>
          { body }
        </ImageBackground>
        <ImageBackground style={{flex: 1}} source={shopImage}>
          { body }
        </ImageBackground>
        <ImageBackground style={{flex: 1}} source={authImage}>
          { body }
        </ImageBackground>
      </Swiper>
    );
  }
}
