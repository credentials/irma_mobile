import React from 'react';
import { Image as RNImage } from 'react-native';

import { Button, Text } from 'native-base';

const HeaderButton = ({ onPress, source, text }) => (
  <Button transparent onPress={onPress}>
    { !source ? null : (
      <RNImage source={source} tintColor="white" />
    )}

    { !text ? null : (
      <Text>{ text }</Text> /* TODO: <-- this doesn't show */
    )}
  </Button>
);

export default HeaderButton;