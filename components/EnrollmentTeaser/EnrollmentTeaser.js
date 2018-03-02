import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground } from 'react-native';

import {
  Button,
  Text,
  Content,
  View,
  Footer,
} from 'native-base';

import Swiper from 'react-native-swiper';

import { namespacedTranslation } from 'lib/i18n';

import passportImage from './children/passport.jpg';
import shopImage from './children/shop.jpg';
import authImage from './children/auth.jpg';

const t = namespacedTranslation('EnrollmentTeaser');

export default class EnrollmentTeaser extends Component {

  static propTypes = {
    navigateToEnrollment: PropTypes.func.isRequired,
    navigateToCredentialDashboard: PropTypes.func.isRequired,
  }

  renderFooter(index, total, swiperLib) {
    const { navigateToEnrollment, navigateToCredentialDashboard } = this.props;

    const footerStyle = {
      height: 110,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    };

    return (
      <View {...footerStyle}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button onPress={navigateToEnrollment} style={{marginTop: 5}}>
            <Text>{ t('.openAccount') }</Text>
          </Button>
        </View>
        <Footer style={{height: 30, backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
          <Button transparent small onPress={navigateToCredentialDashboard} style={{}}>
            <Text>{ t('.notNow') }</Text>
          </Button>
        </Footer>
        { swiperLib.renderPagination() }
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
    // TODO: Can the second image be edited to show the wine bottle more prominently, for the >18 use case?

    return (
      <Swiper
        loop={false}
        paginationStyle={{bottom: 40}}
        renderPagination={::this.renderFooter}
        showsButtons={true}
      >
        <ImageBackground
          imageStyle={{marginTop: 300}}
          source={passportImage}
          style={{flex: 1, backgroundColor: '#2dbfce'}}
        >
          { this.renderTexts(
              t('.slide1.statement'),
              t('.slide1.quote'),
          )}
        </ImageBackground>
        <ImageBackground
          imageStyle={{marginTop: 100}}
          source={shopImage}
          style={{flex: 1, backgroundColor: '#abe3f4'}}
        >
          { this.renderTexts(
              t('.slide2.statement'),
              t('.slide2.quote'),
          )}
        </ImageBackground>
        <ImageBackground
          imageStyle={{marginTop: 100}}
          source={authImage}
          style={{flex: 1, backgroundColor: '#65b7cc'}}
        >
          { this.renderTexts(
              t('.slide3.statement'),
              t('.slide3.quote'),
          )}
        </ImageBackground>
      </Swiper>
    );
  }
}
