import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Alert, View } from 'react-native';

import attributesIcon from 'assets/icons/streamline-regular/01/03/navigation-menu-4.png';
import registerIcon from 'assets/icons/streamline-regular/17/13/single-neutral-actions-add.png';
import changePinIcon from 'assets/icons/streamline-regular/01/10/password-lock-1.png';
import preferencesIcon from 'assets/icons/streamline-regular/01/12/cog.png';
import moreAttributesIcon from 'assets/icons/streamline-regular/01/43/add-circle.png';
import deleteAllIcon from 'assets/icons/streamline-regular/01/23/bin-1.png';
import aboutIcon from 'assets/icons/streamline-regular/01/14/information-circle.png';

import {
  Container,
  Content,
  Left,
  List,
  ListItem,
  Text,
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
      navigateTo: 'EnrollmentTeaser',
    },
    {
      iconImage: changePinIcon,
      text: t('.changePin'),
      isVisible: () => this.props.isEnrolled,
      navigateTo: 'ChangePin',
    },
    {
      iconImage: preferencesIcon,
      text: t('.preferences'),
      navigateTo: 'PreferencesDashboard',
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
      navigateTo: 'About',
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
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Image source={irmaLogo} style={styles.topImage} />
          </View>
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
