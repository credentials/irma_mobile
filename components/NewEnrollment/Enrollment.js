import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import { namespacedTranslation } from 'lib/i18n';
import RepeatedValueForm from 'lib/form/RepeatedValueForm';

import {
  Body,
  Button,
  Text,
  Container,
  Right,
  Card,
  CardItem,
  Icon,
  View,
  Footer,
} from 'native-base';

import PaddedContent from 'lib/PaddedContent';

const t = namespacedTranslation('Enrollment');

export default class Enrollment extends Component {

  static propTypes = {
    changeEmail: PropTypes.func.isRequired,
    changePin: PropTypes.func.isRequired,
    email: PropTypes.string,
    fakeEnroll: PropTypes.func.isRequired,
    navigateToDashboard: PropTypes.func.isRequired,
    pin: PropTypes.string,
  }

  state = {
    showSuccessScreen: false,
    emailFormExpanded: false,
    pinFormExpanded: true,
    forceValidation: false,
  }

  renderIntro() {
    return (
      <Card>
        <CardItem>
          <Text>
            Welcome to IRMA! Please open your IRMA account by completing the two steps below.
          </Text>
        </CardItem>
      </Card>
    );
  }

  renderEmailForm() {
    const { pin, email, changeEmail, fakeEnroll } = this.props;
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

    const nextPress = () => {
      if(!email) {
        this.setState({forceValidation: true});
        return;
      }

      this.setState({emailFormExpanded: false, forceValidation: false});

      if(pin)
        this.setState({showSuccessScreen: true});
      else
        this.setState({pinFormExpanded: true});
    };

    const skipPress = () => {
      this.setState({emailFormExpanded: false, forceValidation: false});

      if(pin) {
        fakeEnroll();
        this.setState({showSuccessScreen: true});
      } else
        this.setState({pinFormExpanded: true});
    };

    return (
        <Card onPress={toggle}>
          <TouchableWithoutFeedback onPress={toggle}>
            <CardItem>
              <Body style={{justifyContent: 'center', flex: 3}}>
                <Text>Step 2: Add your email address</Text>
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
                <CardItem>
                  <Text>
                    We strongly recommend to associate at least one email address with your account.
                    It allows you to login to your MyIRMA environment in case your phone is lost or stolen, so you can close your account.
                  </Text>
                </CardItem>
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
                <View style={{marginVertical: 10, justifyContent: 'center', flexDirection: 'row'}}>
                  <Button light onPress={skipPress} style={{marginRight: 20}}>
                    <Text>Skip</Text>
                  </Button>
                  <Button {...buttonState} onPress={nextPress}>
                    <Text>Next</Text>
                  </Button>
                </View>
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
      [pin ? 'success' : (forceValidation ? 'danger' : 'primary')]: true,
    };

    const nextPress = () => {
      if(pin)
        this.setState({forceValidation: false, pinFormExpanded: false, emailFormExpanded: true});
      else
        this.setState({forceValidation: true});
    };

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
                <Text>Step 1: Choose an IRMA PIN</Text>
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
                  <Text>
                    Enter a PIN of at least 5 digits. You will need to enter your PIN every time you use IRMA.
                    If you forget it, your attributes become unusable and you will have to open a new account.
                  </Text>
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
                  onPress={nextPress}
                  style={{alignSelf: 'center', margin: 10}}
                >
                  <Text>Next</Text>
                </Button>
              </View>
          }
        </Card>
    );
  }

  renderForm() {
    return (
      <PaddedContent>
        { this.renderIntro() }
        { this.renderPinForm() }
        { this.renderEmailForm() }
      </PaddedContent>
    );
  }

  // Might be nicer if this is an extra card below the PIN and email cards that becomes
  // expanded if both the PIN and email cards have been filled in (or not, in case of email)?
  renderSuccess() {
    const { navigateToDashboard } = this.props;

    return [
      <PaddedContent key="success">
        <Card key="success">
          <CardItem>
            <Text>
              You have now succesfully opened your IRMA account.
              You can proceed to load personal attributes.
            </Text>
          </CardItem>
        </Card>
      </PaddedContent>,
      <Footer key="successFooter" style={{height: 60, paddingTop: 7}}>
        <Button primary onPress={navigateToDashboard}>
          <Text>Finish</Text>
        </Button>
      </Footer>
    ];
  }

  render() {
    const { showSuccessScreen } = this.state;

    return (
      <Container style={{backgroundColor: '#E9E9EF'}}>
        { showSuccessScreen ? this.renderSuccess() : this.renderForm() }
      </Container>
    );
  }
}
