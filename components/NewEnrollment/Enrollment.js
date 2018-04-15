import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Footer,
  Icon,
  Left,
  Text,
  View,
} from 'native-base';

import { namespacedTranslation } from 'lib/i18n';
import CollapsableForm from 'lib/form/CollapsableForm';
import PaddedContent from 'lib/PaddedContent';
import ErrorCard from 'components/ErrorCard';
import IconCard from 'components/IconCard';

export const t = namespacedTranslation('Enrollment');

export default class Enrollment extends Component {

  static propTypes = {
    changeEmail: PropTypes.func.isRequired,
    changePin: PropTypes.func.isRequired,
    email: PropTypes.string,
    enroll: PropTypes.func.isRequired,
    error: PropTypes.object,
    navigateToDashboard: PropTypes.func.isRequired,
    pin: PropTypes.string,
    status: PropTypes.string.isRequired,
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

  renderEnrolling() {
    return (
      <IconCard iconName="chatboxes">
        <Text>{ t('.enrolling') }</Text>
      </IconCard>
    );
  }

  renderSuccess() {
    return (
      <IconCard iconName="checkmark-circle">
        <Text>{ t('.success') }</Text>
      </IconCard>
    );
  }

  renderFailure() {
    const { error } = this.props;

    return [
      <IconCard key="header" iconName="alert">
        <Text>{ t('.failure') }</Text>
      </IconCard>,
      <ErrorCard key="error" error={error} />
    ];
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

  renderContent() {
    switch(this.props.status) {
      case 'started':
        return this.renderForm();

      case 'enrolling':
        return this.renderEnrolling();

      case 'success':
        return this.renderSuccess();

      case 'failure':
        return this.renderFailure();
    }
  }

  render() {
    const { status } = this.props;

    return (
      <Container testID="Enrollment" style={{backgroundColor: '#E9E9EF'}}>
        <PaddedContent>
          { this.renderContent() }
        </PaddedContent>
        { status === 'success' ? null :
            this.renderSuccessFooter()
        }
      </Container>
    );
  }
}
