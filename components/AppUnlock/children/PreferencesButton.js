import React from 'react';

import {
  Icon,
  Button,
} from 'native-base';

const PreferencesButton = ({navigateToPreferences}) =>
  <Button transparent onPress={navigateToPreferences}>
    <Icon android="md-settings" ios="ios-settings" />
  </Button>;

export default PreferencesButton;