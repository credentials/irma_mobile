import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ScrollView, Dimensions, Animated } from 'react-native';

import {
  Card,
  CardItem,
  Icon,
  Left,
  ListItem,
  Text,
  Body,
  View,
} from 'native-base';

import { getLanguage } from 'lib/i18n';
import { CardItemThumb } from 'components/CredentialCard/helpers';

const lang = getLanguage();
const disjunctionWidth = Dimensions.get('window').width - 22;

export default class Disjunction extends Component {

  static propTypes = {
    candidateSets: PropTypes.array.isRequired,
    choice: PropTypes.number.isRequired,
    hideUnchosen: PropTypes.bool,
    label: PropTypes.object,
    makeDisclosureChoice: PropTypes.func.isRequired,
  }

  static defaultProps = {
    choice: 0,
    hideUnchosen: false,
    label: null,
  }

  scrollX = new Animated.Value(0)
  scrollView = null

  renderAttribute = (attribute, index) => {
    return (
      <ListItem
        key={index}
        noIndent={true}
      >
        <Left>
          <CardItemThumb source={{uri: attribute.CredentialType.logoUri}} />
          <Body>
            <Text note>
              { attribute.AttributeType.Name[lang] }
            </Text>
            <Text style={{fontWeight: 'normal'}}>
              { attribute.Value[lang] }
            </Text>
          </Body>
        </Left>
      </ListItem>
    );
  }

  renderCandidateSet = (candidateSet, index) => {
    // Decide if this candidate set (un)selected and maybe not displayed
    const {
      hideUnchosen,
      choice,
    } = this.props;
    const isSelected = index === choice;
    if (hideUnchosen && !isSelected)
      return null;

    return (
      <View
        key={index}
        style={{width: disjunctionWidth}}
      >
        { candidateSet.map(this.renderAttribute) }
      </View>
    );
  }

  renderIndicator = () => {
    const {
      candidateSets,
      hideUnchosen,
      choice,
    } = this.props;

    if (hideUnchosen || candidateSets.length <= 1)
      return null;

    const iconStyle = {color: '#a7a7a7', paddingLeft: 10, paddingRight: 10};
    const horizontalStyle = {flexDirection: 'row', alignItems: 'center'};
    const position = Animated.divide(this.scrollX, disjunctionWidth);
    const scroll = (diff) => () => {
      if ( (diff === -1 && choice === 0) || (diff === 1 && choice === candidateSets.length-1))
        return;
      this.scrollView.scrollTo({x: (choice + diff) * disjunctionWidth});
    };

    return (
      <View style={{paddingTop: 5}}>
        <View style={{ ...horizontalStyle, justifyContent: 'center', marginBottom: -5 }}>
          <Text note>{candidateSets.length} options</Text>
        </View>
        <View style={{ ...horizontalStyle, justifyContent: 'space-between' }}>
          <Icon name="ios-arrow-back" style={iconStyle} onPress={scroll(-1)} />
          <View style={{ ...horizontalStyle, justifyContent: 'center' }}>
            { candidateSets.map((_, i) => {
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
      makeDisclosureChoice,
      choice,
    } = this.props;

    if (!makeDisclosureChoice)
      return;
    const newChoice = Math.round(event.nativeEvent.contentOffset.x / disjunctionWidth);
    if (choice !== newChoice)
      makeDisclosureChoice(newChoice);
  }

  render() {
    const {
      label,
      candidateSets,
    } = this.props;

    const labelText = label ? label[lang] : undefined;

    return (
      <Card>
        <View>
          { labelText ? <CardItem><Text style={{fontWeight: 'bold'}}>{ labelText }</Text></CardItem> : null }
          <ScrollView
            ref={ref => (this.scrollView = ref)}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX }}}], { listener: this.positionChanged })}
          >
            { candidateSets.map(this.renderCandidateSet) }
          </ScrollView>
        </View>
        { this.renderIndicator() }
      </Card>
    );
  }
}
