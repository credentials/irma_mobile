import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Card,
  CardItem,
  Text,
  Form,
  View,
  Button,
  Footer,
} from 'native-base';

import { namespacedTranslation } from 'lib/i18n';
import RepeatedValueForm from 'lib/form/RepeatedValueForm';
import FormInput from 'lib/form/FormInput';
import PaddedContent from 'lib/PaddedContent';
import ErrorCard from 'components/ErrorCard';
import IconCard from 'components/IconCard';

const t = namespacedTranslation('ChangePin');
export const headerTitle = t('.title');

export default class ChangePin extends Component {
  static propTypes = {
    changeNewPin: PropTypes.func.isRequired,
    changeOldPin: PropTypes.func.isRequired,
    changePin: PropTypes.func.isRequired,
    error: PropTypes.object,
    navigateBack: PropTypes.func.isRequired,
    remainingAttempts: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    timeout: PropTypes.number,
    validationForced: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    error: null,
    timeout: null,
  }

  renderPinIncorrect() {
    const { status, remainingAttempts } = this.props;

    if (status !== 'pinIncorrect')
      return null;

    const attempts = t('.attempts', {count: remainingAttempts});

    return (
      <CardItem>
        <Text testID="errorText" style={{color: '#ed2f2f'}}>
          { t('.pinIncorrect', {attempts}) }
        </Text>
      </CardItem>
    );
  }

  renderForm() {
    const { changeOldPin, changeNewPin, changePin, validationForced, remainingAttempts } = this.props;

    return (
      <View>
        <Card>
          <CardItem>
            <Text>
              { t('.intro') }
            </Text>
          </CardItem>
          { this.renderPinIncorrect() }
          <Form style={{paddingRight: 20}}>
            <FormInput
              inputType="pin"
              label={ t('.oldPinLabel')}
              onChange={changeOldPin}
              validationForced={validationForced}
              key={`attempt-${remainingAttempts}`}
              showInvalidMessage={true}
            />
          </Form>
          <RepeatedValueForm
            inputType="pin"
            firstLabel={ t('.newPinLabel')}
            repeatLabel={ t('.newPinRepeatLabel')}
            onChange={changeNewPin}
            validationForced={validationForced}
          />
          <View style={{marginVertical: 10, justifyContent: 'center', flexDirection: 'row'}}>
            <Button testID="changeButton" onPress={changePin}>
              <Text>{ t('.doChange') }</Text>
            </Button>
          </View>
        </Card>
      </View>
    );
  }

  renderContent() {
    const { status, error, timeout } = this.props;

    switch (status) {
      case 'idle':
      case 'pinIncorrect':
        return this.renderForm();

      case 'changing':
        return (
          <IconCard iconName="chatboxes">
            <Text>{ t('.changing') }</Text>
          </IconCard>
        );

      case 'success':
        return (
          <IconCard iconName="checkmark-circle">
            <Text>{ t('.success') }</Text>
          </IconCard>
        );

      case 'keyshareBlocked':
        return (
          <IconCard iconName="alert">
            <Text>{ t('.pinBlocked', {duration: timeout}) }</Text>
          </IconCard>
        );

      case 'error':
        return [
          <IconCard key="header" iconName="alert">
            <Text>{ t('.failure') }</Text>
          </IconCard>,
          <ErrorCard key="error" error={error} />
        ];

      default:
        return null;
    }
  }

  renderFooter() {
    const { status, navigateBack } = this.props;

    if (status === 'success' || status === 'keyshareBlocked' || status === 'error') {
      return (
        <Footer style={{height: 60, paddingTop: 7}}>
          <Button primary onPress={ navigateBack }>
            <Text>{ t('.dismiss') }</Text>
          </Button>
        </Footer>
      );
    }

    return null;
  }

  render() {
    return (
      <Container testID="ChangePin" style={{backgroundColor: '#E9E9EF'}}>
        <PaddedContent>
          { this.renderContent() }
        </PaddedContent>
        { this.renderFooter() }
      </Container>
    );
  }
}
