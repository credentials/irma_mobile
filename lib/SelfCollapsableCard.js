import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import {
  Icon,
  View,
  CardItem,
  Left,
  Body,
  Text,
  Thumbnail,
} from 'native-base';

import { CardHeader } from 'components/CredentialCard/helpers';

import Card from 'lib/UnwrappedCard';


export default class SelfCollapsableCard extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.object]).isRequired,
    lockedOpen: PropTypes.bool,
    onLongPress: PropTypes.func,
    style: PropTypes.object,
    transparent: PropTypes.bool,
  }

  static defaultProps = {
    lockedOpen: false,
    onLongPress: () => {},
    style: {},
    transparent: false,
  }

  state = {
    // Unless locked open, the collapsable is default closed on mount
    collapsed: !this.props.lockedOpen,
  }

  press = () => {
    const { lockedOpen } = this.props;
    const { collapsed } = this.state;

    if (lockedOpen)
      return;

    this.setState({collapsed: !collapsed});
  }

  renderHeader() {
    const { header, lockedOpen } = this.props;
    const { collapsed } = this.state;

    const headerProps = {
      // hasBorderBottom: !collapsed,
      rightContent: lockedOpen ? null : (
        <View>
          <Icon name={collapsed ? 'ios-arrow-forward' : 'ios-arrow-down'} />
        </View>
      ),
    };

    // Use the provided header (and add the rightContent prop), or use the default header
    if (React.isValidElement(header))
      return React.cloneElement(header, headerProps);

    return <CardHeader {...headerProps} {...header} />;
  }

  render() {
    const { children, lockedOpen, onLongPress, transparent, style } = this.props;
    const { collapsed } = this.state;

    return (
      <Card transparent={transparent} style={[{flex: 1}, style]}>
        <TouchableWithoutFeedback
          onPress={this.press}
          onLongPress={onLongPress}
        >
          <View>
            { this.renderHeader() }
          </View>
        </TouchableWithoutFeedback>
        { !lockedOpen && collapsed ? null
            : children
        }
      </Card>
    );
  }
}
