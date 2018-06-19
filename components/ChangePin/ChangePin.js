import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { 
  Container,
  Card,
  CardItem,
  Text,
  Form,
  View,
  Button
} from 'native-base';

import { namespacedTranslation } from 'lib/i18n';
import RepeatedValueForm from 'lib/form/RepeatedValueForm';
import FormInput from 'lib/form/FormInput';
import PaddedContent from 'lib/PaddedContent';
import ErrorCard from 'components/ErrorCard';
import IconCard from 'components/IconCard';

export const t = namespacedTranslation('ChangePin');

export default class ChangePin extends Component {
  static propTypes = {
    changeOldPin: PropTypes.func.isRequired,
    changeNewPin: PropTypes.func.isRequired,
    newPin: PropTypes.string,
    status: PropTypes.string.isRequired,
    error: PropTypes.object,
    validationForced: PropTypes.bool.isRequired,
    changePin: PropTypes.func.isRequired,
    remainingAttempts: PropTypes.number.isRequired,
    timeout: PropTypes.number,
  }
  
  static navigationOptions = {
    title: Dimensions.get('window').width > 350 ? t('.title') : t('.shortTitle'),
  }
  
  renderPinError() {
    const { status, remainingAttempts } = this.props;
    
    if (status != 'pinError')
      return null;

    const attempts = t('.attempts', {count: remainingAttempts});

    return (
      <CardItem>
        <Text testID="errorText" style={{color: '#ed2f2f'}}>
          { t('.pinError', {attempts}) }
        </Text>
      </CardItem>
    )
  }
  
  renderForm() {
    const { newPin, changeOldPin, changeNewPin, changePin, validationForced, remainingAttempts } = this.props;
    
    return (
      <View>
        <Card>
          <CardItem>
            <Text>
              { t('.intro') }
            </Text>
          </CardItem>
          { this.renderPinError() }
          <Form style={{paddingRight: 20}}>
            <FormInput
              inputType="pin"
              label={ t('.oldPinLabel') }
              onChange={ changeOldPin }
              validationForced = { validationForced }
              key={`attempt-${remainingAttempts}`}
            />
          </Form>
          <RepeatedValueForm
            inputType="pin"
            firstLabel={ t('.newPinLabel') } 
            repeatLabel={ t('.newPinRepeatLabel') }
            onChange={ changeNewPin }
            validationForced = { validationForced }
            initialValue = { newPin }
          />
          <View style={{marginVertical: 10, justifyContent: 'center', flexDirection: 'row'}}>
            <Button testID="changeButton" onPress = { changePin }>
              <Text>{ t('.doChange') }</Text>
            </Button>
          </View>
        </Card>
      </View>
    );
  }
  
  renderContent() {
    const { status, error, timeout } = this.props;
    
    switch(status) {
      case 'started':
      case 'pinError':
        return this.renderForm()
      
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
          <IconCard iconName="alert">
            <Text>{ t('.failure') }</Text>
          </IconCard>,
          <ErrorCard key="error" error={error} />
        ];
    }
  }
  
  render() {
    return (
      <Container testID="ChangePin" style={{backgroundColor: '#E9E9EF'}}>
        <PaddedContent>
          { this.renderContent() }
        </PaddedContent>
      </Container>
    );
  }
}
