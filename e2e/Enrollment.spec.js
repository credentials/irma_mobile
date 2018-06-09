/*global describe expect it waitFor element by beforeAll afterAll afterEach */

import { labeledScreenshotTaker, startVideo, stopVideo } from './helpers';

const takeScreenshot = labeledScreenshotTaker('Enrollment');

describe('Enrollment', () => {
  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  beforeAll(async () => {
    takeScreenshot('boot');
    startVideo('Enrollment');
  });

  afterAll(async () => {
    stopVideo();
  });

  afterEach(async () => {
    takeScreenshot();
  });

  it('should show the EnrollmentTeaser screen on boot', async () => {
    await waitFor(element(by.id('EnrollmentTeaser'))).toBeVisible();
  });

  it('should go to the Enrollment screen when tapping the enroll button', async () => {
    await element(by.id('enrollButton')).tap();
    await expect(element(by.id('Enrollment'))).toBeVisible();
  });

  it('should display correct error messages', async () => {
    const expectPinError = () => expect(element(by.text('Please enter a PIN of at least 5 digits'))).toBeVisible();

    await element(by.id('nextButton')).tap();
    await expectPinError();

    await element(by.id('nextButton')).tap();
    await element(by.id('firstInput')).typeText('123');
    await expectPinError();

    await element(by.id('firstInput')).typeText('45');
    await expect(element(by.text('The two entered values do not match'))).toBeVisible();

    await element(by.id('pinForm')).tap();
    await element(by.id('repeatInput')).tap();

    await element(by.id('repeatInput')).typeText('12345');
    await expect(element(by.id('errorText'))).toBeNotVisible();
  });

  // it('should display another error message when entering different pins', async () => {
  //
  // });

  // it('should display the CredentialDashboard screen after tapping the dismiss button', async () => {
  //   await element(by.id('dismissButton')).tap();
  //   await expect(element(by.id('CredentialDashboard'))).toBeVisible();
  // });
  //
  // it('should display the QRScanner screen after tapping scan button', async () => {
  //   await element(by.id('scanQRButton')).tap();
  //   await expect(element(by.id('QRScanner'))).toBeVisible();
  // });
  //
  // it('should display the IssuanceSession screen after tapping issuance session button', async () => {
  //   await element(by.id('testIssuance')).tap();
  //   await expect(element(by.text('Receive attributes'))).toBeVisible();
  //   await waitFor(element(by.text('testip wants to issue attributes to you'))).toBeVisible().withTimeout(5000);
  // });
  //
  // it('should display a success message after accepting attributes to be issued', async () => {
  //   await element(by.id('yesButton')).tap();
  //   await waitFor(element(by.text('Successfully received attributes'))).toBeVisible().withTimeout(5000);
  // });
  //
  // it('should display the CredentialDashboard after dismissing the Session', async () => {
  //   await element(by.id('dismissButton')).tap();
  //   await expect(element(by.id('CredentialDashboard'))).toBeVisible();
  // });
})
