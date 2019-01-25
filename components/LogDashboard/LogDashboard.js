import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import {
  Card,
  CardItem,
  Container,
  Text,
  Left,
  Icon,
  Body,
  View,
  H3,
} from 'native-base';

import Disclosure from 'components/Session/children/Disclosure';
import { CardHeader, CredentialHeader, CredentialAttributes } from 'components/CredentialCard/helpers';

import PaddedContent from 'lib/PaddedContent';
import SelfCollapsableCard from 'lib/SelfCollapsableCard';
import nbVariables from 'lib/native-base-theme/variables/platform';
import { namespacedTranslation } from 'lib/i18n';

export const t = namespacedTranslation('LogDashboard');

const intersperse = (arr, separator) =>
  _.flatMap(arr, (value, index) => {
      return index < arr.length - 1 ?
        [value, separator] : value;
    }
  );

export default class LogDashboard extends Component {

  static propTypes = {
    logs: PropTypes.array.isRequired,
  }

  attributeAmount(credentials) {
    const attributeCount = credentials.reduce(
      (acc, cr) => acc + cr.Attributes.length, 0
    );

    return t('common.attributes', {count: attributeCount});
  }

  renderLog = (log) => {
    const { type: type, time: timestamp } = log;

    let iconName, title;
    switch (type) {
      case 'issuing': {
        const attributeAmount = this.attributeAmount(log.issuedCredentials);

        iconName = 'md-log-in';
        title = t('.issuing.title', {attributeAmount});

        break;
      }

      case 'disclosing': {
        const attributeAmount = this.attributeAmount(log.disclosedCredentials);

        iconName = 'md-log-out';
        title = t('.disclosing.title', {attributeAmount});

        break;
      }

      case 'signing': {
        const attributeAmount = this.attributeAmount(log.disclosedCredentials);

        iconName = 'flask';
        title = t('.signing.title', {attributeAmount});

        break;
      }

      default:
        // Bail on unknown log type
        return null;
    }

    const issuedCredentials = log.issuedCredentials.map( credential =>
      <View key={credential.Hash}>
        <CredentialHeader credential={credential} />
        <CredentialAttributes credential={credential} />
      </View>
    );

    const borderStyle = {
      flex: 1,
      borderTopWidth: nbVariables.borderWidth,
      borderColor: nbVariables.listBorderColor,
      marginTop: 10,
    };

    const issuingContent = intersperse(
      issuedCredentials,
      <View style={borderStyle} />
    );

    const disclosingContent = log.disclosedCredentials.map( (disclosedCredential, i) =>
      <Disclosure key={i} label="Something" attributes={disclosedCredential.Attributes} />
    );
    //   <View key={i}>


    //     <Text>{ credential.CredentialType.Name[lang] }</Text>
    //     { credential.Attributes.map( attribute =>
    //         <Text key={attribute.AttributeType.ID}>{ attribute.AttributeType.Name[lang] }: { attribute.Value[lang] }</Text>
    //     )}
    //   </View>
    // );

    const signingContent = !log.signedMessage ? null : (
      <View>
        <Text>Signed message: { log.signedMessage.message }</Text>
      </View>
    );

    const time = moment.unix(timestamp).format('D MMMM YYYY HH:mm:ss');
    const header = (
      <CardHeader
        leftContent={<Icon name={iconName} />}
        title={title}
        subtitle={t('.atTime', {time})}
      />
    );

    return (
      <SelfCollapsableCard
        key={`${time}`}
        header={header}

      >
        { issuingContent}
        { disclosingContent }
        { signingContent }
      </SelfCollapsableCard>
    );
  }

  renderNoLogs() {
    const { logs } = this.props;
    if (logs.length !== 0)
      return null;

    return (
      <View style={{alignItems: 'center'}}>
        <H3 style={{paddingTop: 30, color: '#888888'}}>
          { t('.noLogs') }
        </H3>
      </View>
    );
  }

  render() {
    const { logs } = this.props;

    return (
      <Container>
        <PaddedContent>
          { this.renderNoLogs() }
          { logs.slice().reverse().map(this.renderLog) }
        </PaddedContent>
      </Container>
    );
  }
}
