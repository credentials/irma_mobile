import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
} from 'native-base';

import _ from 'lodash';

import Disjunction from './Disjunction';

export default class MissingDisclosures extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  renderMissingDisclosure = (attributes, index) =>
    <Disjunction
      key={index}
      label={this.props.session.disclosuresLabels ? this.props.session.disclosuresLabels[index] : undefined}
      candidateSets={attributes}
    />

  render() {
    const { session } = this.props;

    if (session.status !== 'unsatisfiableRequest')
      return null;

    return (
      <View>
        { _.map(session.missingDisclosures, this.renderMissingDisclosure) }
      </View>
    );
  }
}
