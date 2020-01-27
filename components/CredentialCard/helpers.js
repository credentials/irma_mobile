import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Collapsible from 'components/Collapsible';

import {
  CardItem,
  Right,
  Text,
  Body,
  Left,
  Card,
  View,
  Thumbnail,
  Icon,
  Button,
} from 'native-base';

import { namespacedTranslation, lang } from 'lib/i18n';
import nbVariables from 'lib/native-base-theme/variables/platform';

const t = namespacedTranslation('CredentialCard'); // TODO: Smack my namespace up

export const RichCardItem = ({title, subtitle, leftContent, rightContent, header, thin, first, last, hasBorderBottom, style}) => {

  const bodyWithoutLeftContentStyle = {marginLeft: 0};

  const borderBottomStyle = {
    borderBottomWidth: nbVariables.borderWidth,
    borderColor: nbVariables.listBorderColor,
    marginBottom: 3,
  };

  const headerTitleStyle = {
    color: subtitle || leftContent ? undefined : '#0076be',
    fontWeight: 'bold',
    fontSize: nbVariables.fontSizeH4,
  };

  return (
    <CardItem
      header={header}
      thin={thin}
      first={first}
      last={last}
      style={[hasBorderBottom ? borderBottomStyle : null, style]}
    >
      <Left>
        { leftContent }
        <Body style={!leftContent ? bodyWithoutLeftContentStyle : null}>
          <Text style={header ? headerTitleStyle : null}>{ title }</Text>
          { !subtitle ? null : (
            <Text note>{ subtitle }</Text>
          )}
        </Body>
      </Left>
      { rightContent }
    </CardItem>
  );
};

export const CardItemThumb = ({source, ...props}) => {
  const style = {
    width: 50,
    height: 50,
    marginTop: -8,
  };

  return (
    <Thumbnail
      square
      style={style}
      resizeMode="contain"
      source={source}
      {...props}
    />
  );
};

export const CardHeader = (props) => {
  return <RichCardItem {...props} header />;
};

export const CredentialTypeAttribute = ({attributeType}) => {
  return (
    <CardItem>
      <Text>
        { attributeType.Name[lang] }
      </Text>
    </CardItem>
  );
};

export const CredentialTypeAttributes = ({attributeTypes}) =>
  attributeTypes.map( attributeType =>
    <CredentialTypeAttribute
      key={attributeType.ID}
      attributeType={attributeType}
    />
  );

export const CredentialAttribute = ({attribute, hasExpired = false, showDescription = false}) => {

  const nameStyle = {color: '#828282', fontSize: 14};
  const expiredStyle = {color: '#a7a7a7'};

  const style = {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingBottom: 5,
  };

  return (
    <CardItem style={style}>
      <View>
        <Text style={[nameStyle, hasExpired ? expiredStyle : null]}>
          { showDescription ? attribute.AttributeType.Description[lang] : attribute.AttributeType.Name[lang] }
        </Text>
      </View>
      <View>
        <Text style={[hasExpired ? expiredStyle : null]}>
          { attribute.Value[lang] }
        </Text>
      </View>
    </CardItem>
  );
};

export const CredentialAttributes = ({credential, showDescription = false, style}) => {

  const divStyle = {
    paddingVertical: nbVariables.cardItemPadding,
  };

  return (
    <View style={[divStyle, style]}>
      { credential.Attributes.map( attribute =>
        <CredentialAttribute
          key={attribute.AttributeType.ID}
          attribute={attribute}
          hasExpired={credential.hasExpired}
          showDescription={showDescription}
        />
      )}
    </View>
  );
};

export const RequestedAttribute = ({attribute}) => {
  const { AttributeType, CredentialType, Value } = attribute;

  const requiredValue = Value ?
    `: "${Value}"` : null;

  return (
    <CardItem key={AttributeType.ID}>
      <Left>
        <CardItemThumb source={{uri: CredentialType.logoUri}} />
        <Body>
          <Text>{ AttributeType.Name[lang] }{ requiredValue }</Text>
          <Text note>{ CredentialType.Name[lang] }</Text>
        </Body>
      </Left>
    </CardItem>
  );
};

export const RequestedDisclosure = ({label, attributes}) =>
  <Card>
    <CardItem header>
      <Text style={{fontWeight: 'bold'}}>{ label }</Text>
    </CardItem>
    {attributes.map(attribute =>
      <RequestedAttribute
        key={attribute.AttributeType.ID}
        attribute={attribute}
      />
    )}
  </Card>;
