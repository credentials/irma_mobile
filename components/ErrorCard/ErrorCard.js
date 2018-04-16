import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { namespacedTranslation } from 'lib/i18n';
import Card from 'lib/UnwrappedCard';
import { Sentry } from 'react-native-sentry';

import {
  Body,
  Button,
  CardItem,
  Left,
  List,
  Right,
  Text,
  View,
} from 'native-base';

const t = namespacedTranslation('ErrorCard');

const mapStateToProps = (state) => {
  const {
    preferences: {
      enableCrashReporting,
    },
  } = state;

  return {
    enableCrashReporting,
  };
};

@connect(mapStateToProps)
export default class ErrorCard extends Component {

  static propTypes = {
    enableCrashReporting: PropTypes.bool.isRequired,
    extraReportInfo: PropTypes.object,
    error: PropTypes.shape({
      type: PropTypes.string.isRequired,
      wrappedError: PropTypes.string,
      info: PropTypes.string,
      remoteStatus: PropTypes.number,
      remoteError: PropTypes.object, // TODO: Might want to provide a shape
      stack: PropTypes.string,
    }).isRequired,
  }

  state = {
    moreInfo: false,
    reported: false,
  }

  reportObject() {
    const {
      error,
      extraReportInfo = {},
    } = this.props;

    return {
      ...error,
      extra: extraReportInfo,
    };
  }

  report() {
    const reportObject = this.reportObject();

    // TODO: Sentry unfortunately doesn't support seeing if captureMessage succeeded,
    // so we lie about the outcome and say it always succeeded.
    // See the mess in raven-js #803 and #524
    Sentry.captureMessage('User reported: ' + reportObject.type, {
      extra: this.reportObject(),
    });

    this.setState({reported: true});
  }

  renderErrorText() {
    const {
      enableCrashReporting,
      error: {type: errorType, info: errorInfo},
    } = this.props;

    const errorTypeMessage = t(`.types.${errorType}`, {
      defaultValue: t('.unknown'),
      errorInfo
    });

    const ifPersistsMessage = enableCrashReporting ?
      t('.ifPersistsReport') : t('.ifPersistsEnableReporting');

    return `${errorTypeMessage}\n\n${ifPersistsMessage}`;
  }

  renderReportItem(name, value) {
    const text = typeof(value) === 'string' ? value : JSON.stringify(value);

    return (
      <View key={name} style={{marginBottom: 10}}>
        <Text>{ name }</Text>
        <Text style={{marginLeft: 10}} note>{ text }</Text>
      </View>
    );
  }

  renderError() {
    const { moreInfo } = this.state;
    if (!moreInfo)
      return null;

    const reportObject = this.reportObject();

    return (
      <Card>
        <CardItem>
          <Text>{ t('.explanation') }</Text>
        </CardItem>
        <CardItem>
          <List>
            { Object.keys(reportObject).map(name =>
                this.renderReportItem(name, reportObject[name])
            ) }
          </List>
        </CardItem>
      </Card>
    );
  }

  renderMoreInfoButton() {
    const { moreInfo } = this.state;
    return (
        <Button small
          style={{width: 130, justifyContent: 'center', alignSelf: 'center'}}
          onPress={() => this.setState({moreInfo: !moreInfo})}
        >
          <Text style={{alignSelf: 'center'}} >
            { moreInfo ? t('.hideinfo') : t('.showinfo') }
          </Text>
        </Button>
    );
  }

  renderReportButton() {
    const { enableCrashReporting } = this.props;
    const { reported } = this.state;

    if(!enableCrashReporting)
      return null;

    return (
      <Button small disabled={reported}
        style={{alignSelf: 'center'}}
        onPress={() => this.report()}
      >
        <Text>
          { !reported? t('.report') : t('.reported') }
        </Text>
      </Button>
    );
  }

  render() {
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
