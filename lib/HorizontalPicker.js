import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ScrollView, Animated } from 'react-native';

import {
  Icon,
  Text,
  View,
} from 'native-base';

export default class HorizontalPicker extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired,
    choice: PropTypes.number.isRequired,
    makeChoice: PropTypes.func,
    hideUnchosen: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    makeChoice: null,
  }

  scrollX = new Animated.Value(0)
  scrollView = null

  renderIndicator = () => {
    const {
      choice,
      children,
      hideUnchosen,
      width,
    } = this.props;

    if (hideUnchosen || children.length <= 1)
      return null;

    const iconStyle = {color: '#a7a7a7', paddingLeft: 10, paddingRight: 10};
    const horizontalStyle = {flexDirection: 'row', alignItems: 'center'};
    const position = Animated.divide(this.scrollX, width);
    const scroll = (diff) => () => {
      if ( (diff === -1 && choice === 0) || (diff === 1 && choice === children.length-1))
        return;
      this.scrollView.scrollTo({x: (choice + diff) * width});
    };

    return (
      <View style={{paddingTop: 5}}>
        <View style={{ ...horizontalStyle, justifyContent: 'center', marginBottom: -5 }}>
          <Text note>{children.length} options</Text>
        </View>
        <View style={{ ...horizontalStyle, justifyContent: 'space-between' }}>
          <Icon name="ios-arrow-back" style={iconStyle} onPress={scroll(-1)} />
          <View style={{ ...horizontalStyle, justifyContent: 'center' }}>
            { children.map((_, i) => {
                const opacity = position.interpolate({
                  inputRange: [i - 1, i, i + 1],
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp',
                });
              return (
                <Animated.View
                  key={i}
                  style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 5, borderRadius: 5 }}
                />
              );
            }) }
          </View>
          <Icon name="ios-arrow-forward" style={iconStyle} onPress={scroll(1)} />
        </View>
      </View>
    );
  }

  positionChanged = event => {
    const {
      makeChoice,
      choice,
      width,
    } = this.props;

    if (!makeChoice)
      return;
    const newChoice = Math.round(event.nativeEvent.contentOffset.x / width);
    if (choice !== newChoice)
      makeChoice(newChoice);
  }

  render() {
    const {
      children,
      hideUnchosen,
    } = this.props;

    return (
      <View>
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          scrollEnabled={!hideUnchosen}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX }}}], { listener: this.positionChanged })}
        >
          { children }
        </ScrollView>
        { this.renderIndicator() }
      </View>
    );
  }
}
