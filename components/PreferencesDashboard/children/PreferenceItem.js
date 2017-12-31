import React from 'react';
import PropTypes from 'prop-types';
import {
  Body,
  List,
  ListItem,
  Text,
  View,
} from 'native-base';

export default class PreferenceItem extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    explanation: PropTypes.node,
    separator: PropTypes.bool,
  }

  render() {
    const { explanation, separator, name } = this.props;
    const padding = {paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 20};

    let listStyle = {backgroundColor: 'white'};
    if (separator && !explanation)
      listStyle = {...listStyle, ...padding};

    return (
      <View>
        <List style={listStyle}>
          <ListItem icon>
            <Body>
              <Text>{ name }</Text>
            </Body>
            { this.props.children }
          </ListItem>
        </List>
        { !explanation ? null :
            <Text style={padding}>{ explanation }</Text>
        }
      </View>
    );
  }
}
