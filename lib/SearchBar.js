import React, { Component } from 'react';
import { StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  Button,
  Item,
  Icon,
  Input,
} from 'native-base';

import nbVariables from 'lib/native-base-theme/variables/platform';
import { namespacedTranslation } from 'lib/i18n';

const t = namespacedTranslation('SearchBar');

export default class SearchBar extends Component {

  static propTypes = {
    onSearch: PropTypes.func,
    onSearchQueryChange: PropTypes.func,
    placeholderText: PropTypes.string,
    searchQuery: PropTypes.string,
  }

  static defaultProps = {
    onSearch: undefined,
    onSearchQueryChange: undefined,
    placeholderText: t('.placeholder'),
    searchQuery: undefined,
  }

  state = {
    searchQuery: '',
    isFocused: false,
  }

  inputRef = null

  changeText = inputText => {
    const { onSearchQueryChange } = this.props;

    if (onSearchQueryChange)
      onSearchQueryChange(inputText);

    this.setState({searchQuery: inputText});
  }

  search = () => {
    const { onSearch } = this.props;

    if (onSearch)
      onSearch(this.getSearchQuery());
  }

  cancel = () => {
    this.inputRef._root.blur();
    this.changeText('');
  }

  focus = () => {
    this.setState({isFocused: true});
  }

  blur = () => {
    this.setState({isFocused: false});
  }

  // When passed searchQuery as a prop, act as a controlled component
  // Otherwise use local state to capture the searchQuery value
  getSearchQuery() {
    const { searchQuery: searchQueryProp } = this.props;
    const { searchQuery: searchQueryState } = this.state;

    if (searchQueryProp !== undefined)
      return searchQueryProp;

    return searchQueryState;
  }

  renderCancelButton() {
    const { isFocused } = this.state;
    if (nbVariables.platform !== 'ios'|| !isFocused)
      return null;

    return (
      <Button
        transparent
        onPress={this.cancel}
      >
        <Text style={styles.cancelButtonText}>
          { t('.cancel') }
        </Text>
      </Button>
    );
  }

  renderClearButton() {
    if (this.getSearchQuery() === '')
      return null;

    return (
      <TouchableOpacity onPress={() => this.changeText('')}>
        <Icon
          name="md-close-circle"
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { placeholderText } = this.props;

    return (
      <View style={styles.bar}>
        <Item style={styles.item}>
          <Icon
            name="ios-search"
            style={styles.icon}
          />
          <Input
            ref={ref => (this.inputRef = ref)}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={24}
            onBlur={this.blur}
            onChangeText={this.changeText}
            onFocus={this.focus}
            onSubmitEditing={this.search}
            placeholder={placeholderText}
            style={styles.input}
            value={this.getSearchQuery()}
          />
          { this.renderClearButton() }
        </Item>
        { this.renderCancelButton() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: nbVariables.toolbarDefaultBg,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: nbVariables.platform === 'ios' ? 6 : 10,
    paddingRight: nbVariables.platform === 'ios' ? 6 : 10,
    paddingTop: nbVariables.platform === 'ios' ? 0 : 0,
    borderBottomWidth: nbVariables.platform === 'ios' ? 1 / PixelRatio.getPixelSizeForLayoutSize(1) : 0,
    borderBottomColor: nbVariables.toolbarDefaultBorder,
    height: nbVariables.platform === 'ios' ? 44 : 36,
    elevation: 3,
    top: 0,
    left: 0,
    right: 0,
  },
  item: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    height: nbVariables.platform === 'ios' ? 30 : 40,
    borderColor: 'transparent',
    backgroundColor: nbVariables.toolbarInputColor,
    borderRadius: nbVariables.platform === 'ios' ? 10 : 3,
  },
  icon: {
    backgroundColor: 'transparent',
    color: nbVariables.dropdownLinkColor,
    fontSize: nbVariables.toolbarSearchIconSize,
    alignItems: 'center',
    marginTop: 4,
    paddingRight: 10,
    paddingLeft: 10,
  },
  input: {
    alignSelf: 'center',
    lineHeight: null,
    height: nbVariables.searchBarInputHeight,
  },
  cancelButtonText: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});