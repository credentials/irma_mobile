import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import { namespacedTranslation } from 'lib/i18n';
import RepeatedValueForm from 'lib/form/RepeatedValueForm';

import {
  Body,
  Header,
  Left,
  Button,
  Text,
  Title,
  Container,
  Right,
  Card,
  CardItem,
  Icon,
  View,
} from 'native-base';

import PaddedContent from 'lib/PaddedContent';

const t = namespacedTranslation('Enrollment');

export default class Enrollment extends Component {

  static propTypes = {
    backToTeaser: PropTypes.func.isRequired,
    pin: PropTypes.string,
    changePin: PropTypes.func.isRequired,
    email: PropTypes.string,
    changeEmail: PropTypes.func.isRequired,
  }

  state = {
    emailFormExpanded: false,
    pinFormExpanded: false,
    forceValidation: false,
  }

  renderHeader() {
    const {
      backToTeaser
    } = this.props;

    return (
      <Header>
        <Left>
          <Button transparent onPress={backToTeaser}>
            <Text>Back</Text>
          </Button>
        </Left>
        <Body style={{flex: 2}}>
          <Title>
            <Text>IRMA registration</Text>
          </Title>
        </Body>
        <Right />
      </Header>
    );
  }

  renderIntro() {
    return (
      <Card>
        <CardItem>
          <Text>
            Register with IRMA in 4 simple steps.
          </Text>
        </CardItem>
      </Card>
    );
  }



  renderEmailForm() {
    const { email, changeEmail } = this.props;
    const { forceValidation, emailFormExpanded } = this.state;

    const toggle = () => this.setState({emailFormExpanded: !emailFormExpanded});
    const validate = value => {
      const regex = /^\s*([^@\s]{1,64})@((?:[-a-z0-9]+\.)+[a-z]{2,})\s*$/i;
      return regex.test(value);
    };

    const iconProps = {
      name: emailFormExpanded ? 'ios-arrow-down' : (email ? 'md-checkmark' : 'ios-arrow-forward'),
      style: {fontSize: 30},
    };

    if(!emailFormExpanded && email)
      iconProps.style.color = '#5cb85c';

    const inputProps = {
      autoCapitalize: 'none',
      autoCorrect: false,
      keyboardType: 'email-address',
    };

    const buttonState = {
      [email ? 'success' : (forceValidation ? 'danger' : 'primary')]: true,
    };

    const buttonPress = () => email ? this.setState({emailFormExpanded: false, pinFormExpanded: true,}) :
      this.setState({forceValidation: true});

    return (
        <Card onPress={toggle}>
          <TouchableWithoutFeedback onPress={toggle}>
            <CardItem>
              <Body style={{justifyContent: 'center', flex: 3}}>
                <Text>Step 1: Enter your email address</Text>
              </Body>
              <Right>
                <Button small transparent>
                  <Icon {...iconProps} />
                </Button>
              </Right>
            </CardItem>
          </TouchableWithoutFeedback>
          { !emailFormExpanded ? null :
              <View>
                <RepeatedValueForm
                  firstLabel={t('.stepOne.label')}
                  forceValidation={forceValidation}
                  initialValue={email}
                  inputProps={inputProps}
                  invalidMessage={t('.stepOne.invalid')}
                  onChange={changeEmail}
                  repeatLabel={t('.stepOne.repeatLabel')}
                  validate={validate}
                />
                <Button
                  {...buttonState}
                  onPress={buttonPress}
                  style={{alignSelf: 'center', margin: 10}}
                >
                  <Text>Next</Text>
                </Button>
              </View>
          }
        </Card>
    );
  }

  renderPinForm() {
    const { pin, changePin } = this.props;
    const { forceValidation, pinFormExpanded } = this.state;

    const toggle = () => this.setState({pinFormExpanded: !pinFormExpanded});
    const validate = value => /\d{5,}/.test(value);

    const iconProps = {
      name: pinFormExpanded ? 'ios-arrow-down' : (pin ? 'md-checkmark' : 'ios-arrow-forward'),
      style: {fontSize: 30},
    };

    if(!pinFormExpanded && pin)
      iconProps.style.color = '#5cb85c';

    const buttonState = {
      [pin ? 'success' : 'danger']: true,
    };

    const buttonPress = () => pin ? this.setState({pinFormExpanded: false}) :
      this.setState({forceValidation: true});

    const inputProps = {
      autoCapitalize: 'none',
      autoCorrect: false,
      keyboardType: 'numeric',
      maxLength: 16,
      secureTextEntry: true,
    };

    return (
        <Card onPress={toggle}>
          <TouchableWithoutFeedback onPress={toggle}>
            <CardItem>
              <Body style={{justifyContent: 'center', flex: 3}}>
                <Text>Step 2: Choose IRMA pin</Text>
              </Body>
              <Right>
                <Button small transparent>
                  <Icon {...iconProps} />
                </Button>
              </Right>
            </CardItem>
          </TouchableWithoutFeedback>
          { !pinFormExpanded ? null :
              <View>
                <CardItem>
                  <Text>Enter a PIN of at least 5 digits. You will need to enter the PIN every time you use IRMA. If you forget it, you will lose access to your attributes and you will have to register again.</Text>
                </CardItem>
                <RepeatedValueForm
                    firstLabel={t('.stepTwo.label')}
                    forceValidation={forceValidation}
                    initialValue={pin}
                    inputProps={inputProps}
                    invalidMessage={t('.stepTwo.invalid')}
                    onChange={changePin}
                    repeatLabel={t('.stepTwo.repeatLabel')}
                    validate={validate}
                />
                <Button
                  {...buttonState}
                  onPress={buttonPress}
                  style={{alignSelf: 'center', margin: 10}}
                >
                  <Text>Next</Text>
                </Button>
              </View>
          }
        </Card>
    );
  }

  render() {
    return (
      <Container style={{backgroundColor: '#E9E9EF'}}>
        { this.renderHeader() }
        <PaddedContent>
          { this.renderIntro() }
          { this.renderEmailForm() }
          { this.renderPinForm() }
        </PaddedContent>
      </Container>
    );
  }
}
