import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Linking, Alert } from 'react-native';
import { namespacedTranslation } from 'lib/i18n';
import {
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Text,
} from 'native-base';

import irmaLogo from 'assets/irmaLogo.png';

const t = namespacedTranslation('Sidebar');

const moreAttributesURL = t('.moreAttributesURL');

const sidebarListItems = [
  {
    icon: {name: 'ios-card-outline'},
    text: t('.attributes'),
    navigateTo: 'DrawerClose',
  },
  {
    icon: {name: 'key'},
    text: t('.register'),
    visible: props => props.unenrolledSchemeManagerIds.length > 0,
    onPress: props => {
      props.navigation.navigate('EnrollmentTeaser');
    }
  },
  {
    icon: {name: 'key'},
    text: t('.changePin'),
    visible: props => props.hasKeyshare,
    onPress: props => {
      props.dispatch({type: 'ChangePin.Start'});
      props.navigation.navigate('ChangePin');
    }
  },
  {
    icon: {android: 'md-settings', ios: 'ios-settings'},
    text: t('.preferences'),
    navigateTo: 'PreferencesDashboard',
  },
  // { // NYI
  //   icon: {ios: 'ios-paper', android: 'md-paper'},
  //   text: t('.log'),
  //   navigateTo: false,
  // },
  {
    icon: {name: 'md-add'},
    text: t('.moreAttributes'),
    onPress: () => Linking.openURL(moreAttributesURL).catch(),
  },
  {
    icon: {ios: 'ios-trash', android: 'md-trash'},
    text: t('.deleteAll.menu'),
    onPress: props => {
      props.navigation.navigate('DrawerClose');
      Alert.alert(
        t('.deleteAll.title'),
        t('.deleteAll.message'),
        [
          {text: t('.deleteAll.cancel'), style: 'cancel'},
          {text: t('.deleteAll.ok'), onPress: () => props.dispatch({type: 'IrmaBridge.RemoveAllAttributes'})},
        ],
        { cancelable: false }
      );
    },
  },
  {
    icon: {name: 'md-help'},
    text: t('.about'),
    navigateTo: 'About',
  },
];

const mapStateToProps = (state) => {
  const {
    enrollment: {
      unenrolledSchemeManagerIds
    },
    changePin: {
      hasKeyshare
    }
  } = state;

  return {
    unenrolledSchemeManagerIds,
    hasKeyshare
  };
};

@connect(mapStateToProps)
export default class Sidebar extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    unenrolledSchemeManagerIds: PropTypes.array.isRequired,
  }

  renderSidebarListItem(listItem) {
    const { navigation: {navigate} } = this.props;
    const {
      icon,
      text,
      onPress,
      navigateTo,
      visible = () => true,
    } = listItem;

    if(!visible(this.props))
      return null;

    let finalOnPress;
    if(onPress)
      finalOnPress = () => onPress(this.props);
    else
      finalOnPress = () => navigateTo ? navigate(navigateTo) : null;

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
            { sidebarListItems.map(::this.renderSidebarListItem) }
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
  }
};
