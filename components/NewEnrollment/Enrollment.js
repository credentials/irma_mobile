import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  View,
  Footer,
} from 'native-base';

import { namespacedTranslation } from 'lib/i18n';
import CollapsableForm from 'lib/CollapsableForm';
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
    emailFormCollapsed: true,
    pinFormCollapsed: false,
    showSuccess: false,
    validationForced: false,
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

  renderPinForm() {
    const { pin, changePin } = this.props;
    const { validationForced, pinFormCollapsed, showSuccess } = this.state;

    const next = () => {
      if(pin)
        this.setState({validationForced: false, pinFormCollapsed: true, emailFormCollapsed: false});
      else
        this.setState({validationForced: true});
    };

    return (
      <CollapsableForm
        headerText="Step 1: Choose an IRMA PIN"

        onToggleCollapse={() => this.setState({pinFormCollapsed: !pinFormCollapsed})}
        collapsed={pinFormCollapsed}
        validationForced={validationForced}

        onNext={next}

        onChange={changePin}
        value={pin}
        locked={showSuccess}

        firstLabel={t('.stepTwo.label')}
        repeatLabel={t('.stepTwo.repeatLabel')}
        inputType="pin"
      >
        <Text>
          Enter a PIN of at least 5 digits. You will need to enter your PIN every time you use IRMA.
          If you forget it, your attributes become unusable and you will have to open a new account.
        </Text>
      </CollapsableForm>
    );
  }

  renderEmailForm() {
    const { pin, email, changeEmail, fakeEnroll } = this.props;
    const { validationForced, emailFormCollapsed, showSuccess } = this.state;

    const next = () => {
      if(!email) {
        this.setState({validationForced: true});
        return;
      }

      this.setState({emailFormCollapsed: true, validationForced: false});

      if(pin)
        this.setState({showSuccess: true});
      else
        this.setState({pinFormCollapsed: false});
    };

    const skip = () => {
      this.setState({emailFormCollapsed: true, validationForced: false});

      if(pin) {
        fakeEnroll();
        this.setState({showSuccess: true});
      } else
        this.setState({pinFormCollapsed: false});
    };

    return (
      <CollapsableForm
        headerText="Step 2: Add your email address"

        onToggleCollapse={() => this.setState({emailFormCollapsed: !emailFormCollapsed})}
        collapsed={emailFormCollapsed}
        validationForced={validationForced}

        onNext={next}
        onSkip={skip}

        onChange={changeEmail}
        value={email}
        locked={showSuccess}

        firstLabel={t('.stepOne.label')}
        repeatLabel={t('.stepOne.repeatLabel')}
        inputType="email"
      >
        <Text>
          We strongly recommend to associate at least one email address with your account.
          It allows you to login to your MyIRMA environment in case your phone is lost or stolen, so you can close your account.
        </Text>
      </CollapsableForm>
    );
  }

  renderForm() {
    return (
      <View>
        { this.renderIntro() }
        { this.renderPinForm() }
        { this.renderEmailForm() }
      </View>
    );
  }

  renderSuccessCard() {
    return (
      <Card>
        <CardItem>
          <Text>
            You have now succesfully opened your IRMA account.
            You can proceed to load personal attributes.
          </Text>
        </CardItem>
      </Card>
    );
  }

  renderSuccessFooter() {
    const { navigateToDashboard } = this.props;

    return (
      <Footer style={{height: 60, paddingTop: 7}}>
        <Button primary onPress={navigateToDashboard}>
          <Text>Finish</Text>
        </Button>
      </Footer>
    );
  }

  render() {
    const { showSuccess } = this.state;

    return (
      <Container style={{backgroundColor: '#E9E9EF'}}>
        <PaddedContent>
          { this.renderForm() }
          { !showSuccess ? null :
              this.renderSuccessCard()
          }
        </PaddedContent>
        { !showSuccess ? null :
            this.renderSuccessFooter()
        }
      </Container>
    );
  }
}
