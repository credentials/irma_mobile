import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { namespacedTranslation } from 'lib/i18n';

import {
  Text,
  Icon,
  View,
} from 'native-base';

const t = namespacedTranslation('Session.MoreIndicator');

export default class MoreIndicator extends Component {

  static propTypes = {
    show: PropTypes.bool,
  }

  static defaultProps = {
    show: true,
  }

  render() {
    if (!this.props.show) return null;

    return (
      <View key="text" style={styles.moreIndicator} pointerEvents="none">
        <View style={{flexDirection: 'row'}}>
          <Text note style={{...styles.text, padding: 20, paddingBottom: 5}}>
            { t('.more') }
            { '  ' }
            <Icon name="ios-arrow-down" style={{fontSize: 14, color: '#a7a7a7'}} />
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  text: {
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 15,
  },
  moreIndicator: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: 60,
  },
};