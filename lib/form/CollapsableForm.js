import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import RepeatedValueForm from 'lib/form/RepeatedValueForm';

import {
  Body,
  Button,
  Text,
  Right,
  Card,
  CardItem,
  Icon,
  View,
} from 'native-base';

export default class CollapsableForm extends Component {

  static propTypes = {
    headerText: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,

    onToggleCollapse: PropTypes.func.isRequired,
    collapsed: PropTypes.bool,
    locked: PropTypes.bool,
    validationForced: PropTypes.bool,

    onNext: PropTypes.func.isRequired,
    onSkip: PropTypes.func,

    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    firstLabel: PropTypes.string.isRequired,
    repeatLabel: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
  }

  static defaultProps = {
    collapsed: false,
    locked: false,
    validationForced: false,
  }

  renderHeader() {
    const { collapsed, headerText, locked, onToggleCollapse, value } = this.props;

    // Show a checkmark when in collapsed and valid state, and show collapse state icons otherwise
    const iconName = collapsed || locked ?
      (value ? 'md-checkmark' : 'ios-arrow-forward') :
      'ios-arrow-down';

    // Success checkmark should be green
    const buttonTheme = iconName === 'md-checkmark' ? 'success' : 'primary';
    const buttonProps = {[buttonTheme]: true, transparent: true};

    return (
      <TouchableWithoutFeedback onPress={onToggleCollapse}>
        <CardItem>
          <Body style={{justifyContent: 'center', flex: 3}}>
            <Text>{ headerText }</Text>
          </Body>
          { locked && !value ? null :
              <Right>
                <Button {...buttonProps}>
                  <Icon name={iconName} style={{fontSize: 30}} />
                </Button>
              </Right>
          }
        </CardItem>
      </TouchableWithoutFeedback>
    );
  }

  renderBody() {
    const {
      children,
      collapsed,
      firstLabel,
      inputType,
      locked,
      onChange,
      onNext,
      onSkip,
      repeatLabel,
      validationForced,
      value,
    } = this.props;

    // Don't show the expanded body when collapsed or locked
    if(collapsed || locked)
      return null;

    // Set button color based on validation and forcedValidation state
    const buttonTheme = value ? 'success' :
      (validationForced ? 'danger' : 'primary');
    const buttonProps = {[buttonTheme]: true};

    return (
      <View>
        <CardItem>
          { children }
        </CardItem>
        <RepeatedValueForm
          firstLabel={firstLabel}
          initialValue={value}
          inputType={inputType}
          invalidMessage="TODOTODO"
          onChange={onChange}
          repeatLabel={repeatLabel}
          validationForced={validationForced}
        />
        <View style={{marginVertical: 10, justifyContent: 'center', flexDirection: 'row'}}>
          { !onSkip ? null :
              <Button light onPress={onSkip} style={{marginRight: 20}}>
                <Text>Skip</Text>
              </Button>
          }
          <Button {...buttonProps} onPress={onNext}>
            <Text>Next</Text>
          </Button>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Card>
        { this.renderHeader() }
        { this.renderBody() }
      </Card>
    );
  }
}
