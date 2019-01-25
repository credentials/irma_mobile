import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Alert } from 'react-native';

import {
  CHANGE_PIN_SCREEN,
  PREFERENCES_DASHBOARD_SCREEN,
  LOG_DASHBOARD_SCREEN,
  CREDENTIAL_TYPE_DASHBOARD_SCREEN,
  ABOUT_SCREEN,
} from 'lib/navigation';

import {
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Text,
} from 'native-base';

import { namespacedTranslation } from 'lib/i18n';
import irmaLogo from 'assets/irmaLogo.png';

const t = namespacedTranslation('Sidebar');

export default class Sidebar extends Component {

  static propTypes = {
    isEnrolled: PropTypes.bool.isRequired,
    canEnroll: PropTypes.bool.isRequired,
    closeSidebar: PropTypes.func.isRequired,
    deleteAllCredentials: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    navigateToEnrollment: PropTypes.func.isRequired,
  }

  sidebarListItems = [
    {
      icon: {name: 'ios-card-outline'},
      text: t('.attributes'),
      onPress: this.props.closeSidebar,
    },
    {
      icon: {name: 'key'},
      text: t('.register'),
      isVisible: () => this.props.canEnroll,
      onPress: this.props.navigateToEnrollment,
    },
    {
      icon: {name: 'key'},
      text: t('.changePin'),
      isVisible: () => this.props.isEnrolled,
      navigateTo: CHANGE_PIN_SCREEN,
    },
    {
      icon: {android: 'md-settings', ios: 'ios-settings'},
      text: t('.preferences'),
      navigateTo: PREFERENCES_DASHBOARD_SCREEN,
    },
    {
      icon: {ios: 'ios-paper', android: 'md-paper'},
      text: t('.log'),
      navigateTo: LOG_DASHBOARD_SCREEN,
    },
    {
      icon: {name: 'md-add'},
      text: t('.moreAttributes'),
      navigateTo: CREDENTIAL_TYPE_DASHBOARD_SCREEN,
    },
    {
      icon: {ios: 'ios-trash', android: 'md-trash'},
      text: t('.deleteAll.menu'),
      isVisible: () => this.props.isEnrolled,
      onPress: () => {
        const { closeSidebar, deleteAllCredentials } = this.props;

        Alert.alert(
          t('.deleteAll.title'),
          t('.deleteAll.message'),
          [
            {text: t('.deleteAll.cancel'), style: 'cancel'},
            {text: t('.deleteAll.ok'), onPress: () => {
              deleteAllCredentials();
              closeSidebar();
            }},
          ],
          { cancelable: false }
        );
      },
    },
    {
      icon: {name: 'md-help'},
      text: t('.about'),
      navigateTo: ABOUT_SCREEN,
    },
  ]

  renderSidebarListItem = (listItem) => {
    const { navigate } = this.props;
    const {
      icon,
      isVisible = () => true,
      navigateTo,
      onPress,
      text,
    } = listItem;

    if (!isVisible(this.props))
      return null;

    let finalOnPress;
    if (onPress)
      finalOnPress = () => onPress();
    else
      finalOnPress = () => (navigateTo ? navigate(navigateTo) : null);

    return (
      <ListItem key={text} button onPress={finalOnPress}>
        <Left>
          <Icon style={styles.icon} {...icon} />
          <Text>{ text }</Text>
        </Left>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content bounces={false} style={styles.content}>
          <Image source={irmaLogo} style={styles.topImage} />
          <List>
            { this.sidebarListItems.map(this.renderSidebarListItem) }
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    backgroundColor: '#fff',
    top: -1,
  },
  topImage: {
    height: 120,
    marginTop: 30,
    position: 'relative',
    resizeMode: 'contain',
  },
  icon: {
    fontSize: 30,
    width: 35,
  },
};
