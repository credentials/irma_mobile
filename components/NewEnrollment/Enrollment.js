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
import CollapsableForm from 'lib/form/CollapsableForm';
import PaddedContent from 'lib/PaddedContent';

export const t = namespacedTranslation('Enrollment');

export default class Enrollment extends Component {

  static propTypes = {
    changeEmail: PropTypes.func.isRequired,
    changePin: PropTypes.func.isRequired,
    email: PropTypes.string,
    enroll: PropTypes.func.isRequired,
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
            { t('.intro') }
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
        testID="pinForm"
        headerText={ t('.step1.header') }

        onToggleCollapse={() => this.setState({pinFormCollapsed: !pinFormCollapsed})}
        collapsed={pinFormCollapsed}
        validationForced={validationForced}

        onNext={next}

        onChange={changePin}
        value={pin}
        locked={showSuccess}

        firstLabel={ t('.step1.label') }
        repeatLabel={ t('.step1.repeatLabel') }
        invalidMessage={ t('.step1.invalidMessage') }
        inputType="pin"
      >
        <Text>
          { t('.step1.text') }
        </Text>
      </CollapsableForm>
    );
  }

  renderEmailForm() {
    const { pin, email, changeEmail, enroll } = this.props;
    const { validationForced, emailFormCollapsed, showSuccess } = this.state;

    const next = () => {
      if(!email) {
        this.setState({validationForced: true});
        return;
      }

      this.setState({emailFormCollapsed: true, validationForced: false});

      if(pin) {
        enroll({ pin, email });
      } else
        this.setState({pinFormCollapsed: false});
    };

    const skip = () => {
      this.setState({emailFormCollapsed: true, validationForced: false});

      if(pin)
        enroll({ pin, email: null });
      else
        this.setState({pinFormCollapsed: false});
    };

    return (
      <CollapsableForm
        headerText={ t('.step2.header') }

        onToggleCollapse={() => this.setState({emailFormCollapsed: !emailFormCollapsed})}
        collapsed={emailFormCollapsed}
        validationForced={validationForced}

        onSkip={skip}
        onNext={next}

        onChange={changeEmail}
        value={email}
        locked={showSuccess}

        firstLabel={t('.step2.label')}
        repeatLabel={t('.step2.repeatLabel')}
        invalidMessage={ t('.step2.invalidMessage') }
        inputType="email"
      >
        <Text>
          { t('.step2.text') }
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
            { t('.success') }
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
          <Text>{ t('.finish') }</Text>
        </Button>
      </Footer>
    );
  }

  render() {
    const { showSuccess } = this.state;

    return (
      <Container testID="Enrollment" style={{backgroundColor: '#E9E9EF'}}>
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
