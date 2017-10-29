import React from 'react';
import PropTypes from 'prop-types';
import {
  Body,
  List,
  ListItem,
  Text,
  View
} from 'native-base';

export default class PreferenceItem extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    explanation: PropTypes.object,
    separator: PropTypes.bool
  }

  render() {
    const { explanation, separator, name } = this.props;
    let text;
    let listStyle = {backgroundColor: 'white'};
    let padding = {paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 20};


    if (separator && !explanation)
      listStyle = {...listStyle, ...padding};
    if (explanation) {
      text = (
        <Text style={padding}>
          {explanation}
        </Text>
      );
    }

    return (
      <View>
        <List style={listStyle}>
          <ListItem icon>
            <Body><Text>{name}</Text></Body>
            {this.props.children}
          </ListItem>
        </List>
        { text }
      </View>
    );
  }
}