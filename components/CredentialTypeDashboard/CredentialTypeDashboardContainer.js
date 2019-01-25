import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fuse from 'fuse.js';

import { lang } from 'lib/i18n';

import CredentialTypeDashboard from './CredentialTypeDashboard';

let search = null;

const mapStateToProps = (state) => {
  const {
    credentialTypeDashboard: {
      searchQuery,
    },
    irmaConfiguration: {
      credentialTypes,
    },
  } = state;

  const credentialTypesList = Object.values(credentialTypes);

  if (!search) {
    const options = {
      shouldSort: true,
      tokenize: true,
      findAllMatches: true,
      includeMatches: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        'Name.en',
        'Attributes.Name.en',
      ],
    };

    search = new fuse(credentialTypesList, options);
  }

  const searchResults = search.search(searchQuery);
  const filteredCredentialTypes = searchQuery === '' ?
    credentialTypesList : searchResults.map(elem => elem.item);

  // const filteredCredentialTypes =
  //   Object.values(credentialTypes).filter( credentialType =>
  //     RegExp(`${searchQuery}`, 'i').test(credentialType.Name[lang])
  //   );

  return {
    credentialTypes: filteredCredentialTypes,
  };
};

@connect(mapStateToProps)
export default class CredentialTypeDashboardContainer extends Component {

  static propTypes = {
    credentialTypes: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    title: CredentialTypeDashboard.title,
  }

  searchQueryChange = searchQuery => {
    const { dispatch } = this.props;

    dispatch({
      type: 'CredentialTypeDashboard.Search',
      searchQuery,
    });
  }

  render() {
    const { credentialTypes } = this.props;

    return (
      <CredentialTypeDashboard
        credentialTypes={credentialTypes}
        searchQueryChange={this.searchQueryChange}
      />
    );
  }
}
