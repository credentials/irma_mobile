import React from 'react';
import { Linking, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { namespacedTranslation } from 'lib/i18n';
import {
  Body,
  Container,
  Content,
  List,
  ListItem,
  Text,
  Right,
  Switch,
} from 'native-base';

const t = namespacedTranslation('Preferences');

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

    return (
      <Container>
        <Content style={{marginTop: 10}}>
          <List style={{backgroundColor: 'white'}}>
            <ListItem icon>
              <Body><Text>{t('.crashes.title')}</Text></Body>
              <Right>
                <Switch value={sendCrashReports} onValueChange={(v) => this.updateSendCrashReports(v) }/>
              </Right>
            </ListItem>
          </List>
          <Text style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 20}}>
            { t('.crashes.explanation') }
            <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://privacybydesign.foundation/privacy-policy-en/')}>
               { t('.crashes.privacypolicy') }&nbsp;
            </Text>
            { t('.crashes.moreinfo') }
          </Text>
          {/* <List style={{backgroundColor: 'white'}}>
            <ListItem icon>
              <Body><Text>{ t('.schememanagers.title') }</Text></Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List> */}
        </Content>
      </Container>
    );
  }
}
