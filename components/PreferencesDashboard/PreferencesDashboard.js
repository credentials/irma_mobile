import React from 'react';
import { Linking, AsyncStorage } from 'react-native';
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
const privacypolicy = 'https://privacybydesign.foundation/privacy-policy-en/';

@connect()
export default class PreferencesDashboard extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static navigationOptions = () => ({
    title: t('.title'),
  })

  state = {
    sendCrashReports: true
  }

  componentDidMount() {
    AsyncStorage.getItem('sendCrashReports').then((v) => {
      if (v === null) v = true;
      this.setState({'sendCrashReports': JSON.parse(v)});
    }).done();
  }

  updateSendCrashReports(sendCrashReports) {
    const { dispatch } = this.props;
    this.setState({sendCrashReports});
    AsyncStorage.setItem('sendCrashReports', JSON.stringify(sendCrashReports));
    dispatch({type: 'IrmaBridge.SendCrashReports', sendCrashReports});
  }

  render() {
    let { sendCrashReports } = this.state;

    const crashesExplanation = (
      <Text>
        { t('.crashes.explanation') }
        <Text style={{color: 'blue'}} onPress={() => Linking.openURL(privacypolicy)}>
          { t('.crashes.privacypolicy') }&nbsp;
        </Text>
        { t('.crashes.moreinfo') }
      </Text>
    );

    return (
      <Container>
        <Content style={{marginTop: 10}}>
          <PreferenceItem name={t('.crashes.title')} explanation={crashesExplanation}>
            <Right>
              <Switch value={sendCrashReports} onValueChange={(v) => this.updateSendCrashReports(v) }/>
            </Right>
          </PreferenceItem>
          {/* <PreferenceItem name={t('.schememanagers.title')}>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </PreferenceItem> */}
        </Content>
      </Container>
    );
  }
}
