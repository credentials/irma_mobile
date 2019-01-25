import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { namespacedTranslation, lang } from 'lib/i18n';
import nbVariables from 'lib/native-base-theme/variables/platform';

import CredentialCard from 'components/CredentialCard';
import SortableFlatList from 'components/SortableFlatList';

import Footer from './children/Footer';
import { ABOUT_SCREEN } from 'lib/navigation';

import {
  Button,
  Container,
  H3,
  Icon,
  Text,
  View,
} from 'native-base';

export const t = namespacedTranslation('CredentialDashboard');

export default class CredentialDashboard extends Component {

  static propTypes = {
    credentials: PropTypes.array.isRequired,
    deleteCredential: PropTypes.func.isRequired,
    enrolled: PropTypes.bool.isRequired,
    isEditable: PropTypes.bool.isRequired,
    makeEditable: PropTypes.func.isRequired,
    navigateToEnrollment: PropTypes.func.isRequired,
    navigateToQRScanner: PropTypes.func.isRequired,
  }

  state = {
    credentials: this.props.credentials,
  }

  renderEnrollButton() {
    const { navigateToEnrollment } = this.props;

    const buttonStyle = {alignSelf: 'center', borderRadius: 0, paddingHorizontal: 10};

    return (
      <View style={{paddingTop: 60}}>
        <Button iconLeft primary onPress={navigateToEnrollment} style={buttonStyle}>
          <Icon name="key" style={{color: 'white'}} />
          <Text style={{color: 'white'}}>{ t('.unenrolled.button') }</Text>
        </Button>
      </View>
    );
  }

  renderNoCredentialsHint() {
    const { credentials, enrolled } = this.props;
    if (credentials.length !== 0)
      return null;

    const status = enrolled ? 'noAttributes' : 'unenrolled';

    return (
      <View key="title" style={{alignItems: 'center'}}>
        <H3 style={{paddingTop: 30, color: '#888888'}}>
          { t(`.${status}.header`) }
        </H3>
        <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
          <Text style={{paddingTop: 30, color: '#888888'}}>
            { t(`.${status}.text`) }
          </Text>
          { enrolled ? null : this.renderEnrollButton() }
        </View>
      </View>
    );
  }

  renderCredentialListItem = ({item: credential, move, moveEnd}) => {
    const { deleteCredential, makeEditable, isEditable } = this.props;

    return (
      <CredentialCard
        credential={credential}
        isEditable={isEditable}
        onDeletePress={() => deleteCredential(credential)}
        onLongPress={makeEditable}
        onReorderPress={move}
        onReorderPressOut={moveEnd}
      />
    );
  }

  render() {
    const {
      enrolled,
      navigateToQRScanner,
      deleteCredential,
      makeEditable,
      isEditable,
    } = this.props;

    const { credentials } = this.state;

    return (
      <Container testID="CredentialDashboard">
        <View style={{flex: 1, padding: nbVariables.contentPadding, paddingBottom: 20}}>
          { this.renderNoCredentialsHint() }
          <SortableFlatList
            data={credentials}
            renderItem={this.renderCredentialListItem}
            keyExtractor={(credential) => credential.Hash}
            onMoveEnd={({ data }) => this.setState({credentials: data})}
          />

          {/* { credentials.map( credential =>
            <CredentialCard
              key={credential.Hash}
              credential={credential}
              isEditable={isEditable}
              onDeletePress={() => deleteCredential(credential)}
              onLongPress={makeEditable}
              // onReorderPress={move}
              // onReorderPressOut={moveEnd}
            />
          )} */}
        </View>

        <Footer
          enrolled={enrolled}
          navigateToQRScanner={navigateToQRScanner}
        />
      </Container>
    );
  }
}
