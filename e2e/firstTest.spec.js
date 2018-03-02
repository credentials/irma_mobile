describe('Example', () => {
  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('should show the Enrollment screen on first start', async () => {
    await expect(element(by.id('Enrollment'))).toBeVisible();
  });

  it('should display the CredentialDashboard screen after tapping the dismiss button', async () => {
    await element(by.id('dismiss')).tap();
    await expect(element(by.id('CredentialDashboard'))).toBeVisible();
  });

  it('should display the QRScanner screen after tapping scan button', async () => {
    await element(by.id('scanQR')).tap();
    await expect(element(by.id('QRScanner'))).toBeVisible();
  });

  it('should display the IssuanceSession screen after tapping issuance session button', async () => {
    await element(by.id('testIssuance')).tap();
    await expect(element(by.text('Receive attributes'))).toBeVisible();
    await waitFor(element(by.text('testip wants to issue attributes to you'))).toBeVisible().withTimeout(5000);
  });

  it('should display a success message after accepting attributes to be issued', async () => {
    await element(by.id('yesButton')).tap();
    await waitFor(element(by.text('Successfully received attributes'))).toBeVisible().withTimeout(5000);
  });

  it('should display the CredentialDashboard after dismissing the Session', async () => {
    await element(by.id('dismissButton')).tap();
    await expect(element(by.id('CredentialDashboard'))).toBeVisible();
  });


  //
  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });
  //
  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
})
