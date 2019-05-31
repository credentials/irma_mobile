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
    children: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    makeChoice: PropTypes.func,
  }

  static defaultProps = {
    makeChoice: null,
  }

  choice = 0
  scrollX = new Animated.Value(0)
  scrollView = null

  renderIndicator = () => {
    const {
      children,
      width,
    } = this.props;

    if (children.length <= 1)
      return null;

    const iconStyle = {color: '#a7a7a7', paddingLeft: 10, paddingRight: 10};
    const horizontalStyle = {flexDirection: 'row', alignItems: 'center'};
    const position = Animated.divide(this.scrollX, width);
    const scroll = (diff) => () => {
      if ( (diff === -1 && this.choice === 0) || (diff === 1 && this.choice === children.length-1))
        return;
      this.scrollView.scrollTo({x: (this.choice + diff) * width});
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
      width,
    } = this.props;

    const newChoice = Math.round(event.nativeEvent.contentOffset.x / width);
    if (this.choice !== newChoice) {
      this.choice = newChoice;
      if (makeChoice) makeChoice(newChoice);
    }
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <View>
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          scrollEnabled={children.length > 1}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX }}}], { listener: this.positionChanged })}
        >
          { children }
        </ScrollView>
        { this.renderIndicator() }
      </View>
    );
  }
}
