import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { namespacedTranslation } from 'lib/i18n';
import Card from 'lib/UnwrappedCard';
import { Sentry, SentrySeverity, } from 'react-native-sentry';

import {
  Body,
  Button,
  CardItem,
  Left,
  List,
  Right,
  Text,
  Toast,
  View,
} from 'native-base';

const t = namespacedTranslation('Session.Error');

export default class Error extends Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
  }

  state = {
    moreInfo: false,
    reported: false,
  }

  reportObject() {
    const { session: { errorType, errorMessage, errorInfo, errorStatus, irmaAction,  apiError, qr, didRespondPermission, errorStack } } = this.props;
    return { errorType, errorMessage, errorInfo, errorStatus, irmaAction,  apiError, qr, didRespondPermission, errorStack };
  }

  report() {
    const extra = this.reportObject();
    Sentry.captureMessage('User reported: ' + extra.errorType, {
      level: SentrySeverity.Error,
      extra,
    });

    this.setState({reported: true});
    Toast.show({
      text: t('.reportedThanks'),
      position: 'bottom',
      duration: 2000,
    });
  }

  renderErrorText() {
    const { session: {errorType, errorInfo} } = this.props;
    let msg = t(`.codes.${errorType}`, {
      defaultValue: t('.unknown'),
      errorInfo
    });
    return msg + '\n\n' + t('.persists');
  }

  renderReportItem(name, value) {
    const text = typeof(value) === 'string' ? value : JSON.stringify(value);
    return (
      <View key={name} style={{marginBottom: 10}}>
        <Text>{name}</Text>
        <Text style={{marginLeft: 10}} note>{text}</Text>
      </View>
    );
  }

  renderError() {
    const { moreInfo } = this.state;
    if (!moreInfo)
      return null;

    const obj = this.reportObject();

    return (
      <Card>
        <CardItem>
          <Text>{ t('.explanation') }</Text>
        </CardItem>
        <CardItem>
          <List>
            { Object.keys(obj).map(name => this.renderReportItem(name, obj[name])) }
          </List>
        </CardItem>
      </Card>
    );
  }

  renderMoreInfoButton() {
    const { moreInfo } = this.state;
    return (
        <Button small
          style={{width: 125, justifyContent: 'center', alignSelf: 'center'}}
          onPress={() => this.setState({moreInfo: !moreInfo})}
        >
          <Text style={{alignSelf: 'center'}} >{ moreInfo ? t('.hideinfo') : t('.showinfo') }</Text>
        </Button>
    );
  }

  renderReportButton() {
    const { reported } = this.state;
    return (
      <Button small disabled={reported}
        style={{alignSelf: 'center'}}
        onPress={() => this.report()}
      >
        <Text>{ !reported? t('.report') : t('.reported') }</Text>
      </Button>
    );
  }

  render() {
    const { session: { status } } = this.props;
    if(status !== 'failure')
      return null;

    return (
      <View>
        <Card>
          <CardItem>
            <Body>
              <Text>{ this.renderErrorText() }</Text>
            </Body>
          </CardItem>
        </Card>
        <View style={{flexDirection: 'row', marginVertical: 15}}>
          <Left>{ this.renderMoreInfoButton() }</Left>
          <Right>{ this.renderReportButton() }</Right>
        </View>
        { this.renderError() }
      </View>
    );
  }
}
