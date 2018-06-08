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

export const t = namespacedTranslation('Changepin');

export default class Changepin extends Component {
  static propTypes = {
    changeOldpin: PropTypes.func.isRequired,
    changeNewpin: PropTypes.func.isRequired,
    oldpin: PropTypes.string,
    newpin: PropTypes.string,
    status: PropTypes.string.isRequired,
    error: PropTypes.object,
    validationForced: PropTypes.bool.isRequired,
    changepin: PropTypes.func.isRequired,
  }
  
  static navigationOptions = {
    title: Dimensions.get('window').width > 350 ? t('.title') : t('.shortTitle'),
  }
  
  renderPinerror() {
    const { status } = this.props;
    
    if (status != 'pinerror')
      return null;
    
    return (
      <CardItem>
        <Text testID="errorText" style={{color: '#ed2f2f'}}>
          { t('.pinerror') }
        </Text>
      </CardItem>
    )
  }
  
  renderForm() {
    const { oldpin, newpin, changeOldpin, changeNewpin, changepin, validationForced } = this.props;
    
    return (
      <View>
        <Card>
          <CardItem>
            <Text>
              { t('.intro') }
            </Text>
          </CardItem>
          { this.renderPinerror() }
          <Form style={{paddingRight: 20}}>
            <FormInput
              inputType="pin"
              label={ t('.oldpinLabel') }
              initialValue = { oldpin }
              onChange={ changeOldpin }
              validationForced = { validationForced }
            />
          </Form>
          <RepeatedValueForm
            inputType="pin"
            firstLabel={ t('.newpinLabel') } 
            repeatLabel={ t('.newpinRepeatLabel') }
            initialValue = { newpin }
            onChange={ changeNewpin }
            validationForced = { validationForced }
          />
          <View style={{marginVertical: 10, justifyContent: 'center', flexDirection: 'row'}}>
            <Button testID="changeButton" onPress = { changepin }>
              <Text>{ t('.dochange') }</Text>
            </Button>
          </View>
        </Card>
      </View>
    );
  }
  
  renderContent() {
    const { status, error } = this.props;
    
    switch(status) {
      case 'started':
      case 'pinerror':
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
    const { oldpin, newpin, changeOldpin, changeNewpin} = this.props;

    return (
      <Container testID="Changepin" style={{backgroundColor: '#E9E9EF'}}>
        <PaddedContent>
          { this.renderContent() }
        </PaddedContent>
      </Container>
    );
  }
}
