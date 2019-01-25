import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Alert, Linking } from 'react-native';

import attributesIcon from 'streamline/icons/regular/PNG/01-InterfaceEssential/03-Menu/24w/navigation-menu-4.png';
import registerIcon from 'streamline/icons/regular/PNG/17-Users/13-Geomertic-Close-Up-Single-User-Actions-Neutral/24w/single-neutral-actions-add.png';
import changePinIcon from 'streamline/icons/regular/PNG/01-InterfaceEssential/10-Password/24w/password-lock-1.png';
import preferencesIcon from 'streamline/icons/regular/PNG/01-InterfaceEssential/12-Settings/24w/cog.png';
import moreAttributesIcon from 'streamline/icons/regular/PNG/01-InterfaceEssential/43-Remove-Add/24w/add-circle.png';
import deleteAllIcon from 'streamline/icons/regular/PNG/01-InterfaceEssential/23-Delete/24w/bin-1.png';
import aboutIcon from 'streamline/icons/regular/PNG/01-InterfaceEssential/14-Alerts/24w/information-circle.png';

import {
  CHANGE_PIN_SCREEN,
  PREFERENCES_DASHBOARD_SCREEN,
  ABOUT_SCREEN,
} from 'lib/navigation';

import {
  Container,
  Content,
  Left,
  List,
  ListItem,
  Text,
  View,
} from 'native-base';

import { namespacedTranslation } from 'lib/i18n';
import irmaLogo from 'assets/irmaLogo.png';

export const t = namespacedTranslation('Sidebar');

export default class Sidebar extends Component {

  static propTypes = {
    canEnroll: PropTypes.bool.isRequired,
    closeSidebar: PropTypes.func.isRequired,
    deleteAllCredentials: PropTypes.func.isRequired,
    isEnrolled: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
    navigateToEnrollment: PropTypes.func.isRequired,
    navigateToMoreAttributes: PropTypes.func.isRequired,
  }

  sidebarListItems = [
    {
      iconImage: attributesIcon,
      text: t('.attributes'),
      onPress: this.props.closeSidebar,
    },
    {
      iconImage: registerIcon,
      text: t('.register'),
      isVisible: () => this.props.canEnroll,
      onPress: this.props.navigateToEnrollment,
    },
    {
      iconImage: changePinIcon,
      text: t('.changePin'),
      isVisible: () => this.props.isEnrolled,
      navigateTo: CHANGE_PIN_SCREEN,
    },
    {
      iconImage: preferencesIcon,
      text: t('.preferences'),
      navigateTo: PREFERENCES_DASHBOARD_SCREEN,
    },
    {
      iconImage: moreAttributesIcon,
      text: t('.moreAttributes'),
      onPress: this.props.navigateToMoreAttributes,
    },
    {
      iconImage: deleteAllIcon,
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
      iconImage: aboutIcon,
      text: t('.about'),
      navigateTo: ABOUT_SCREEN,
    },
  ]

  renderSidebarListItem = (listItem) => {
    const { navigate } = this.props;
    const {
      iconImage,
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
          <Image style={{width: 28, height: 28, marginRight: 10}} source={iconImage} />
          <Text style={{fontSize: 17}}>{ text }</Text>
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
    marginBottom: 20,
    position: 'relative',
    resizeMode: 'contain',
  },
};
