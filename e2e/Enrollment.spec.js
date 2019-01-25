/*global describe expect it waitFor element by beforeAll afterAll afterEach */

// import { labeledScreenshotTaker, startVideo, stopVideo } from './helpers';

// const takeScreenshot = labeledScreenshotTaker('Enrollment');

const getMatcher = selector => {
  const idMatch = selector.match(/^#(.+)$/);
  if (idMatch)
    return by.id(idMatch[1]);

  return by.text(selector);
};

const $ = (...selectors) => {
  const matchers = selectors.map(getMatcher).reduce( (acc, matcher) =>
    matcher.withAncestor(acc)
  );

  return element(matchers);
};

const expect$ = selector =>
  expect($(selector));

const waitForVisible$ = selector =>
  waitFor($(selector)).toBeVisible().withTimeout(2000);

describe('Enrollment with email', () => {
  // EnrollmentTeaser
  const teaserOneText = 'IRMA is like a personalized';
  const teaserTwoText = 'IRMA allows you to reveal';
  const teaserThreeText = 'IRMA allows you to gain';

  const swipeTeaserLeft = () =>
    $('#EnrollmentTeaser').swipe('left', 'fast', 0.25);

  it('should show the EnrollmentTeaser screen on boot', async () => {
    await waitForVisible$('#EnrollmentTeaser');
    await expect$(teaserOneText).toBeVisible();
  });

  it('should show the second teaser screen', async () => {
    await swipeTeaserLeft();

    await waitForVisible$(teaserTwoText);
    await expect$(teaserTwoText).toBeVisible();
  });

  it('should show the third teaser screen', async () => {
    await swipeTeaserLeft();

    await waitForVisible$(teaserThreeText);
    await expect$(teaserThreeText).toBeVisible();
  });

  it('should go to the Enrollment screen when tapping the enroll button', async () => {
    await $('#enrollButton').tap();
    await expect$('#Enrollment').toBeVisible();
  });

  // Enrollment PIN
  const pinHeaderText = 'If you forget it';
  const pinInvalidText = 'Please enter a PIN of at least 5 digits';
  const notMatchingText = 'The two entered values do not match';

  it('should display the header text for the PIN step', async () => {
    await expect$('#pinForm').toBeVisible();
    await expect$(pinHeaderText).toBeVisible();
  });

  it('should display a pin invalid text on empty PIN', async () => {
    await $('#pinForm', '#nextButton').tap();
    await expect$(pinInvalidText).toBeVisible();
  });

  it('should still display a pin invalid text on too short PIN', async () => {
    await $('#pinForm', '#firstInput').typeText('123');
    await expect$(pinInvalidText).toBeVisible();
  });

  it('should display the non-matching error when the PIN is sufficiently long', async () => {
    await $('#pinForm', '#firstInput').typeText('45');
    await expect$(notMatchingText).toBeVisible();
  });

  it('should not display an error message when both pins are filled in correctly', async () => {
    await $('#pinForm').tap();
    await $('#pinForm', '#repeatInput').tap();
    await $('#pinForm', '#repeatInput').typeText('12345');

    await expect$(pinInvalidText).toBeNotVisible();
    await expect$(notMatchingText).toBeNotVisible();
  });

  // Enrollment email
  const emailHeaderText = 'Associate an email address';
  const emailInvalidText = 'Please enter a valid email address';

  it('should continue to the email step when tapping next', async () => {
    await $('#pinForm', '#nextButton').tap();

    await waitForVisible$(emailHeaderText); // TODO: Should not be necessary

    await expect$(pinHeaderText).toBeNotVisible();
    await expect$(emailHeaderText).toBeVisible();
  });

  it('should display a email invalid text on empty email', async () => {
    await $('#emailForm', '#nextButton').tap();
    await expect$(emailInvalidText).toBeVisible();
  });

  it('should still display a email invalid text', async () => {
    await $('#firstInput').tap();
    await $('#firstInput').typeText('alice');
    await expect$(emailInvalidText).toBeVisible();
  });

  it('should display the non-matching error for a correct address', async () => {
    await $('#firstInput').typeText('@example.com');
    await expect$(notMatchingText).toBeVisible();
  });

  it('should not display an error message when both emails are filled in correctly', async () => {
    await $('#emailForm').tap();
    await $('#repeatInput').tap();
    await $('#repeatInput').typeText('alice@example.com');

    await expect$(emailInvalidText).toBeNotVisible();
    await expect$(notMatchingText).toBeNotVisible();
  });

  it('should display a skip button', async () => {
    await expect$('#emailForm', '#skipButton').toBeVisible();
  });

  // Result
  const enrollingText = 'Opening IRMA account...';
  const enrolledText = 'You have now successfully';

  const dashboardText = 'Your attributes';
  const credentialText = 'MyIRMA login';

  it('should enroll when tapping next', async () => {
    await $('#nextButton').tap();

    await waitForVisible$(enrollingText);
    await expect$(enrollingText).toBeVisible();

    await waitForVisible$(enrolledText);
    await expect$(enrolledText).toBeVisible();
  });

  it('should go to the CredentialDashboard with the login credential when tapping finish', async () => {
    await waitForVisible$('#finishButton');
    await element(by.id('finishButton')).tap();

    await expect$('#CredentialDashboard').toBeVisible();
    await expect$('#CredentialDashboard', dashboardText).toBeVisible();
    await expect$(credentialText).toBeVisible();
  });
});

describe('Enrollment without email', () => {
  beforeAll(async () => {
    // await device.uninstallApp();
    // await device.installApp();
  });

  // it('should allow enrollment without email', async () => {
  //   await waitFor$('#EnrollmentTeaser').toBeVisible();
  // });
});