import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

import { namespacedTranslation } from 'lib/i18n';
import PaddedContent from 'lib/PaddedContent';
import Card from 'lib/UnwrappedCard';

// TODO: Themize these colors and transfer them over to other screens
// const blue1 = '#014289'; <-- used this one for title and next/prev buttons
// const blue2 = '#0284BE';
// const blue3 = '#02B1E6';

import {
  Body,
  CardItem,
  Container,
  Header,
  Text,
  Title,
  Left,
  Thumbnail,
  Right,
  Button,
  Footer,
} from 'native-base';

import irmaLogo from 'assets/irmaLogo.png';
import RepeatedValueForm from 'lib/form/RepeatedValueForm';

const t = namespacedTranslation('Enrollment');

// TODO: Make this work using react-navigation
export default class Enrollment extends Component {

  static propTypes = {
    changeEmail: PropTypes.func.isRequired,
    changePin: PropTypes.func.isRequired,
    currentStep: PropTypes.number.isRequired,
    dismiss: PropTypes.func.isRequired,
    email: PropTypes.string,
    enrollmentError: PropTypes.string,
    enrollmentStatus: PropTypes.string.isRequired,
    forceValidation: PropTypes.bool.isRequired,
    nextStep: PropTypes.func.isRequired,
    pin: PropTypes.string,
    prevStep: PropTypes.func.isRequired,
  }

  renderHeader() {
    const {
      currentStep,
      prevStep,
      nextStep
    } = this.props;

    const {width: screenWidth} = Dimensions.get('window');

    return (
      <Header style={{height: 80, paddingTop: 20}}>
        <Left>
          { currentStep === 0 ?
              <Thumbnail source={irmaLogo} /> :
              <Button transparent onPress={prevStep}>
                <Text>{ t('.back') }</Text>
              </Button>
          }
        </Left>
        <Body style={{flex: 2}}>
          <Title>
            { screenWidth < 375 ?
                t('.shortTitle') :
                t('.title')
            }
          </Title>
          { currentStep !== 0 ?
            <Text note>{ t('.subtitle', { step: currentStep }) }</Text> :
            null
          }
        </Body>
        <Right>
          <Button transparent onPress={nextStep}>
            <Text>
              { currentStep == 3 ? t('.finish') : t('.next') }
            </Text>
          </Button>
        </Right>
      </Header>
    );
  }

  renderIntro() {
    const {
      dismiss,
    } = this.props;

    return [
      <PaddedContent key="intro">
        <Card>
          <CardItem>
            <Body>
              <Text>{ t('.intro.text') }</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                <Text style={{fontWeight: 'bold'}}>{t('.intro.notice')}:</Text>&nbsp;
                {t('.intro.warning')}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </PaddedContent>,
      <Footer key="footer" style={{height: 40}}>
        <Button transparent small onPress={dismiss} style={{paddingTop: 14}}>
          <Text>{ t('.notnow') }</Text>
        </Button>
      </Footer>
    ];
  }

  renderStepOne() {
    const {
      changeEmail,
      email,
      forceValidation,
    } = this.props;

    const validate = value => {
      const regex = /^\s*([^@\s]{1,64})@((?:[-a-z0-9]+\.)+[a-z]{2,})\s*$/i;
      return regex.test(value);
    };

    const inputProps = {
      autoCapitalize: 'none',
      autoCorrect: false,
      keyboardType: 'email-address',
    };

    return (
      <PaddedContent key="stepOne">
        <Card>
          <CardItem>
            <Body>
              <Text>{ t('.stepOne.text') }</Text>
            </Body>
          </CardItem>
        </Card>
        <RepeatedValueForm
          firstLabel={ t('.stepOne.label') }
          forceValidation={forceValidation}
          initialValue={email}
          inputProps={inputProps}
          invalidMessage={ t('.stepOne.invalid') }
          onChange={changeEmail}
          repeatLabel={ t('.stepOne.repeatLabel') }
          validate={validate}
        />
      </PaddedContent>
    );
  }

  renderStepTwo() {
    const {
      changePin,
      forceValidation,
      pin,
    } = this.props;

    const validate = value => /\d{5,}/.test(value);

    const inputProps = {
      autoCapitalize: 'none',
      autoCorrect: false,
      keyboardType: 'numeric',
      maxLength: 16,
      secureTextEntry: true,
    };

    return (
      <PaddedContent key="stepTwo">
        <Card>
          <CardItem>
            <Body>
              <Text>
                { t('.stepTwo.pleaseEnterPin') }
                {'\n\n'}<Text style={{fontWeight: 'bold'}}>{ t('.stepTwo.important') }</Text>:&nbsp;
                { t('.stepTwo.rememberPin') }
              </Text>
            </Body>
          </CardItem>
        </Card>
        <RepeatedValueForm
          firstLabel={ t('.stepTwo.label') }
          forceValidation={forceValidation}
          initialValue={pin}
          inputProps={inputProps}
          invalidMessage={ t('.stepTwo.invalid') }
          onChange={changePin}
          repeatLabel={ t('.stepTwo.repeatLabel') }
          validate={validate}
        />
      </PaddedContent>
    );
  }

  renderSuccess() {
    const { email } = this.props;

    return (
      <CardItem>
        <Body>
          <Text>{ t('.stepThree.success', { email })}</Text>
        </Body>
      </CardItem>
    );
  }

  renderFailure() {
    const { enrollmentError } = this.props;

    return (
      <CardItem>
        <Body>
          <Text>{ t('.stepThree.failure', { enrollmentError }) }</Text>
        </Body>
      </CardItem>
    );
  }

  renderStepThree() {
    const { enrollmentStatus } = this.props;

    if(enrollmentStatus === 'started')
      return null;

    return (
      <PaddedContent>
        <Card>
          { enrollmentStatus === 'success' ?
              this.renderSuccess() : this.renderFailure()
          }
        </Card>
      </PaddedContent>
    );
  }

  render() {
    const { currentStep } = this.props;
    const stepRenderers = [
      ::this.renderIntro, ::this.renderStepOne, ::this.renderStepTwo, ::this.renderStepThree
    ];

    return (
      <Container>
        { this.renderHeader() }
        { stepRenderers[currentStep]() }
      </Container>
    );
  }
}
