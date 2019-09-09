import React from 'react';
import { Image as RNImage, View as RNView } from 'react-native';

import { Button, Text } from 'native-base';

const HeaderButton = ({ onPress, source, text }) => (
  <RNView style={{marginLeft: 20, marginRight: 20}}>
    <Button transparent onPress={onPress} style={{alignItems: 'center', justifyContent: 'center'}}>
      { !source ? null : (
        <RNImage source={source} tintColor="white" />
      )}

      { !text ? null : (
        <Text style={{color: 'white'}}>{ text }</Text>
      )}
    </Button>
  </RNView>
);

export default HeaderButton;
