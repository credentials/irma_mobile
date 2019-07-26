import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import {
  Container,
  Text,
  Icon,
  View,
  H3,
} from 'native-base';

import { CardHeader } from 'components/CredentialCard/helpers';
import CredentialCard from 'components/CredentialCard';

import PaddedContent from 'lib/PaddedContent';
import SelfCollapsableCard from 'lib/SelfCollapsableCard';
import nbVariables from 'lib/native-base-theme/variables/platform';
import { namespacedTranslation, lang } from 'lib/i18n';
import CandidateSet from '../Session/children/CandidateSet';
import {disjunctionWidth} from '../Session/children/Styles';

export const t = namespacedTranslation('LogDashboard');

const intersperse = (arr, separator) =>
  _.flatMap(arr, (value, index) => {
    return index < arr.length - 1 ? [value, separator] : value;
  });

const borderStyle = {
  flex: 1,
  borderTopWidth: nbVariables.borderWidth,
  borderColor: nbVariables.listBorderColor,
  marginTop: 10,
};

const headerStyle = {
  color: nbVariables.titleColor,
  fontWeight: 'bold',
  fontSize: nbVariables.fontSizeH4,
};

export default class LogDashboard extends Component {

  static propTypes = {
    logs: PropTypes.array.isRequired,
    loadNewLogs: PropTypes.func.isRequired,
  };

  static attributeAmount(credentials) {
    const attributeCount = credentials.reduce(
        (acc, cr) => acc + cr.Attributes.length, 0
    );

    return t('common.attributes', {count: attributeCount});
  }

  // empty candidate sets are rendered with an explanatory label, so it has a height
  candidateSetHeight = candidateSet => ( candidateSet.length === 0 ? 1 :
    candidateSet.length + candidateSet.map(s => s.length).reduce((a, b) => a+b, 0) );

  renderIssuingContent = (log) => {
    if (log.issuedCredentials.length === 0) {
      return null;
    }

    const issuedCredentials = log.issuedCredentials.map( credential =>
      <View key={credential.Hash} style={{marginLeft: 10}}>
        <Text style={headerStyle}>{t('.issuing.header')}:</Text>
        <View key={`card-${credential.Hash}`}>
          <CredentialCard
            key={`card-${credential.Hash}`}
            credential={credential}
            lockMode="open"
            showActionButtons={false}
            embeddedInCard={true}
          />
         </View>
      </View>
    );

      return intersperse(
        issuedCredentials,
        <View style={borderStyle} />
      );
  };

  renderDisclosingContent = (log) => {
    if (log.disclosuresCandidates.length === 0) {
      return null;
    }
    return (
      <View style={{marginLeft: 10}}>
        <Text style={headerStyle}>{t('.disclosing.header')}:</Text>
        <CandidateSet candidateSet={log.disclosuresCandidates}
          width={this.candidateSetHeight(log.disclosuresCandidates)}
          height={disjunctionWidth}
        />
      </View>
      );
  };

  renderRemovalContent = (log) => {
    if(log.removedCredentials.length === 0) {
      return null;
    }
    return (
        <View style={{marginLeft: 10}}>
          <Text style={headerStyle}>{t('.removal.header')}:</Text>
          <CandidateSet candidateSet={log.removedCredentials}
                        width={this.candidateSetHeight(log.removedCredentials)}
                        height={disjunctionWidth}
          />
        </View>
    );
  };

  renderSigningContent = (log) => {
    if (log.signedMessage === null) {
      return null
    }

    return (
      <View style={{margin: 10}}>
        <Text style={headerStyle}>{t('.signing.header')}:</Text>
        <Text>{log.signedMessage.message}</Text>
      </View>
    );
  };

  renderLog = ({item}) => {
    const log = item.log;
    const { type: type, time: timestamp, serverName: serverName } = log;

    let iconName, title;
    switch (type) {
      case 'issuing': {
        //const attributeAmount = this.attributeAmount(log.issuedCredentials);

        iconName = 'md-log-in';
        title = t('.issuing.title');
        if (serverName !== null) {
          title += ' ' + t('.issuing.serverName', { serverName: serverName[lang]})
        }

        break;
      }

      case 'disclosing': {
        //const attributeAmount = this.attributeAmount(log.disclosedCredentials);

        iconName = 'md-log-out';
        title = t('.disclosing.title');
        if (serverName !== null) {
          title += ' ' + t('.disclosing.serverName', { serverName: serverName[lang]})
        }

        break;
      }

      case 'signing': {
        //const attributeAmount = this.attributeAmount(log.disclosedCredentials);

        iconName = 'create';
        title = t('.signing.title');
        if (serverName !== null) {
          title += ' ' + t('.signing.serverName', { serverName: serverName[lang]})
        }

        break;
      }

      case 'removal': {
        const attributeAmount = log.removedCredentials.length;

        iconName = 'md-trash';
        title = t('.removal.title', {amount: attributeAmount});

        break;
      }

      default:
        // Bail on unknown log type
        return null;
    }

    const disclosingContent = this.renderDisclosingContent(log);
    const issuingContent = this.renderIssuingContent(log);
    const removalContent = this.renderRemovalContent(log);
    const signingContent = this.renderSigningContent(log);

    const time = moment.unix(timestamp).format('D MMM YYYY HH:mm:ss');
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
        { signingContent }
        { issuingContent}
        { disclosingContent }
        { removalContent }
      </SelfCollapsableCard>
    );
  };

  renderNoLogs() {
    return (
        <Container>
          <PaddedContent>
            <View style={{alignItems: 'center'}}>
              <H3 style={{paddingTop: 30, color: '#888888'}}>
                { t('.noLogs') }
              </H3>
            </View>
          </PaddedContent>
        </Container>
    );
  }

  render() {
    const { logs, loadNewLogs } = this.props;
    const contentContainerStyle = {padding: nbVariables.contentPadding, paddingBottom: 20};

    if (logs.length === 0) {
      return this.renderNoLogs();
    }

    return (
        <FlatList
          data={logs.map(log => {return ({key: log.time, log: log})})}
          renderItem={this.renderLog}
          onEndReached={loadNewLogs}
          onEndReachedThreshold={0.5}
          contentContainerStyle={contentContainerStyle}
        />
    );
  }
}
