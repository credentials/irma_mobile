import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { namespacedTranslation, lang } from 'lib/i18n';
import PaddedContent from 'lib/PaddedContent';
import SearchBar from 'lib/SearchBar';

import {
  Container,
} from 'native-base';

const t = namespacedTranslation('CredentialTypeDashboard');

import SelfCollapsableCard from 'lib/SelfCollapsableCard';
import { CardHeader, CredentialTypeAttributes } from 'components/CredentialCard/helpers';

export default class CredentialTypeDashboard extends Component {

  static propTypes = {
    credentialTypes: PropTypes.array.isRequired,
    searchQueryChange: PropTypes.func.isRequired,
  }

  static title = t('.title')

  renderCredentialType = (credentialType) => {
    const { Attributes, fullID } = credentialType;

    const header = (
      <CardHeader
        imageSource={{uri: credentialType.logoUri}}
        title={credentialType.Name[lang]}
      />
    );

    return (
      <SelfCollapsableCard
        key={fullID}
        header={header}
      >
        <CredentialTypeAttributes attributeTypes={Attributes} />
      </SelfCollapsableCard>
    );
  }

  render() {
    const { credentialTypes, searchQueryChange } = this.props;

    return (
      <Container>
        <SearchBar
          onSearchQueryChange={searchQueryChange}
        />
        <PaddedContent>
          { credentialTypes.map(this.renderCredentialType) }
        </PaddedContent>
      </Container>
    );
  }
}
