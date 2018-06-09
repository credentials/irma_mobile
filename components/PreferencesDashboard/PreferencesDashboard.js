import React from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { namespacedTranslation } from 'lib/i18n';
import {
  Container,
  Content,
  Text,
  Right,
  Switch,
} from 'native-base';
import PreferenceItem from './children/PreferenceItem';

const t = namespacedTranslation('Preferences');
const privacyPolicyUrl = 'https://privacybydesign.foundation/privacy-policy-en/';

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
export default class PreferencesDashboard extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    enableCrashReporting: PropTypes.bool.isRequired,
  }

  static navigationOptions = () => ({
    title: t('.title'),
  })

  setCrashReportingPreference(enableCrashReporting) {
    const { dispatch } = this.props;

    dispatch({
      type: 'IrmaBridge.SetCrashReportingPreference',
      enableCrashReporting,
    });
  }

  render() {
    const { enableCrashReporting } = this.props;

    const reportingExplanation = (
      <Text>
        { t('.errors.explanation') }
        <Text style={{color: 'blue'}} onPress={() => Linking.openURL(privacyPolicyUrl)}>
          { t('.errors.privacypolicy') }&nbsp;
        </Text>
        { t('.errors.moreinfo') }
      </Text>
    );

    return (
      <Container>
        <Content style={{marginTop: 10}}>
          <PreferenceItem name={t('.errors.title')} explanation={reportingExplanation}>
            <Right>
              <Switch value={enableCrashReporting} onValueChange={::this.setCrashReportingPreference}/>
            </Right>
          </PreferenceItem>
        </Content>
      </Container>
    );
  }
}
