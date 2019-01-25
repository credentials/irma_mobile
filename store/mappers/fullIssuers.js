import _ from 'lodash';

const fullIssuer = (issuer, configurationPath) => {
  const { SchemeManagerID, ID } = issuer;

  return {
    ...issuer,
    logoUri: `file://${configurationPath}/${SchemeManagerID}/${ID}/logo.png`,
  };
};

export default (issuers, configurationPath) =>
  _.mapValues(issuers, issuer => fullIssuer(issuer, configurationPath));