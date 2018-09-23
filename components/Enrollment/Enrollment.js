import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardItem,
  Container,
  Footer,
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
    disableRetry: PropTypes.bool.isRequired,
    email: PropTypes.string,
    enroll: PropTypes.func.isRequired,
    error: PropTypes.object,
    navigateToDashboard: PropTypes.func.isRequired,
    pin: PropTypes.string,
    retryEnroll: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
  }

  static navigationOptions = {
    title: Dimensions.get('window').width > 350 ? t('.title') : t('.shortTitle'),
  }

  state = {
    emailFormCollapsed: true,
    pinFormCollapsed: false,
    validationForced: false,
  }

  renderFormIntro() {
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
    const { validationForced, pinFormCollapsed } = this.state;

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

        firstLabel={ t('.step1.label') }
        repeatLabel={ t('.step1.repeatLabel') }
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
    const { validationForced, emailFormCollapsed } = this.state;

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

        firstLabel={t('.step2.label')}
        repeatLabel={t('.step2.repeatLabel')}
        inputType="email"
      >
        <Text>
          { t('.step2.text') }
        </Text>
      </CollapsableForm>
    );
  }

  renderContent() {
    const { status, error } = this.props;

    switch(status) {
      case 'started':
        return (
          <View>
            { this.renderFormIntro() }
            { this.renderPinForm() }
            { this.renderEmailForm() }
          </View>
        );

      case 'enrolling':
        return (
          <IconCard iconName="chatboxes">
            <Text>{ t('.enrolling') }</Text>
          </IconCard>
        );

      case 'success':
        return (
          <IconCard iconName="checkmark-circle">
            <Text>{ t('.success') }</Text>
          </IconCard>
        );

      case 'failure':
        return [
          <IconCard key="header" iconName="alert">
            <Text>{ t('.failure') }</Text>
          </IconCard>,
          <ErrorCard key="error" error={error} />
        ];
    }
  }

  renderFooter() {
    const { status, navigateToDashboard, retryEnroll, disableRetry } = this.props;

    const wrapFooter = children =>
      <Footer style={{height: 60, paddingTop: 7}}>
        { children }
      </Footer>;

    switch(status) {
      case 'success':
        return wrapFooter(
          <Button primary onPress={navigateToDashboard}>
            <Text>{ t('.finish') }</Text>
          </Button>
        );

      case 'failure':
        return wrapFooter(
          <Button primary disabled={disableRetry} onPress={retryEnroll}>
            <Text>{ t('.retry') }</Text>
          </Button>
        );

      default:
        return null;
    }
  }

  render() {
    return (
      <Container testID="Enrollment" style={{backgroundColor: '#E9E9EF'}}>
        <PaddedContent>
          { this.renderContent() }
        </PaddedContent>
        { this.renderFooter() }
      </Container>
    );
  }
}
