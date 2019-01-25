import React from 'react';
import moment from 'moment';

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
} from 'native-base';

import { namespacedTranslation, lang } from 'lib/i18n';
import nbVariables from 'lib/native-base-theme/variables/platform';

const t = namespacedTranslation('CredentialCard'); // TODO: Smack my namespace up

export const RichCardItem = ({title, subtitle, imageSource, icon, leftContent, rightContent, header, thin, first, last, hasBorderBottom, style}) => {

  const bodyWithoutLeftContentStyle = {marginLeft: 0};

  if (imageSource || icon)
    leftContent = <CardItemImage source={imageSource} icon={icon} />;

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

const CardItemThumb = ({source}) =>
  <Thumbnail resizeMode="contain" small source={source} square />;

const CardItemIcon = (props) => {
  // Make the icon smaller than the CardItemThumb, but add margin to
  // make it fill the same amount of space
  const style = {
    marginLeft: 12,
    width: 24,
    fontSize: 24,
  };

  return <Icon style={style} {...props} />;
};

// CardItemImage renders either a thumbnail or an icon
export const CardItemImage = ({source, icon = {}}) => {
  if (source)
    return <CardItemThumb source={source} />;

  return <CardItemIcon {...icon} />;
};

export const CardHeader = (props) => {
  return <RichCardItem {...props} header />;
};

export const CredentialHeader = ({credential, hideUnexpiredExpiry = false, rightContent = null}) => {
  const { CredentialType, hasExpired } = credential;

  const hideExpiry = hideUnexpiredExpiry && !hasExpired;

  const nameStyle = {fontFamily: nbVariables.titleFontfamily};
  const largeNameStyle = {fontSize: nbVariables.fontSizeH4};
  const expiredNameStyle = {color: '#a7a7a7'};
  const expiredExpiryStyle = {color: '#d72020'};

  return (
    <CardItem header>
      <Left>
        <CardItemImage source={{uri: CredentialType.logoUri}} />
        <Body>
          <Text style={[nameStyle, hideExpiry ? largeNameStyle : null, hasExpired ? expiredNameStyle : null]}>
            { CredentialType.Name[lang] }
          </Text>
          { hideExpiry && !hasExpired ? null : (
            <Text note style={hasExpired ? expiredExpiryStyle : null}>
              { hasExpired ? t('.expired') : t('.expires') }
              { ' ' }{ moment.unix(credential.Expires).format('D MMM YYYY') }
            </Text>
          )}
        </Body>
      </Left>
      { rightContent }
    </CardItem>
  );
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

  const nameValueWithDescriptionStyle = {paddingBottom: 0};
  const nameStyle = {color: '#828282', fontSize: 14};
  const valueStyle = {};
  const expiredStyle = {color: '#a7a7a7'};

  const nameValue = (
    <CardItem style={[{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}, showDescription ? nameValueWithDescriptionStyle : null]}>
      <View>
        <Text style={[nameStyle, hasExpired ? expiredStyle : null]}>
          { attribute.AttributeType.Name[lang] }
        </Text>
      </View>
      <View>
        <Text style={[valueStyle, hasExpired ? expiredStyle : null]}>
          { attribute.Value[lang] }
        </Text>
      </View>
    </CardItem>
  );

  if (!showDescription)
    return nameValue;

  const description = !showDescription ? null : (
    <CardItem style={{paddingTop: 0, backgroundColor: null}}>
      <Text note>{ attribute.AttributeType.Description[lang] }</Text>
    </CardItem>
  );

  return (
    <View>
      { nameValue }
      { description }
    </View>
  );
};

export const CredentialAttributes = ({credential, showDescription = false}) =>
  credential.Attributes.map( attribute =>
    <CredentialAttribute
      key={attribute.AttributeType.ID}
      attribute={attribute}
      hasExpired={credential.hasExpired}
      showDescription={showDescription}
    />
  );

export const RequestedAttribute = ({attribute}) => {
  const { AttributeType, CredentialType, Value } = attribute;

  const requiredValue = Value ?
    `: "${Value}"` : null;

  return (
    <CardItem key={AttributeType.ID}>
      <Left>
        <CardItemImage source={{uri: CredentialType.logoUri}} />
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
