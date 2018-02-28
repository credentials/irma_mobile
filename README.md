irma_mobile
===========

### Authentication made easy, privacy-friendly, and secure

IRMA offers a privacy-friendly, flexible and secure solution to many authentication problems, putting the user in full control over his/her data.

The IRMA app manages the user's IRMA attributes: receiving new attributes, selectively disclosing them to others, and attaching them to signed statements. These attributes can be relevant properties, such as: "I am over 18", "my name is ..." and "I am entitled to access ....". They are only stored on the user's device and nowhere else.

<img src="https://credentials.github.io/images/irma_mobile/2-android.png" width="200" alt="Screenshot of the IRMA app on Android, showing the 'Your Attributes' screen with four credentials." /> &nbsp;
<img src="https://credentials.github.io/images/irma_mobile/1-ios.png" width="200" alt="Screenshot of the IRMA app on iOS, showing the 'Your Attributes' screen with two credentials." /> &nbsp;
<img src="https://credentials.github.io/images/irma_mobile/4-android.png" width="200" alt="Screenshot of the IRMA app on Android, showing the 'disclose these attributes?' screen." />
<img src="https://credentials.github.io/images/irma_mobile/3-ios.png" width="200" alt="Screenshot of the IRMA app on iOS, showing the PIN entry screen during a disclosure session." /> &nbsp;

## Developing for Android

- Follow the steps for "Installing dependencies" for "Building Projects with Native Code" (not the "Quick Start"):
    - https://facebook.github.io/react-native/docs/0.51/getting-started.html
    - You may skip the step to install `react-native-cli`
    - The Android NDK should also be installed through the SDK Manager. This can be done by checking the 'LLDB', 'CMake', and 'NDK' options in the [SDK Tools tab](https://developer.android.com/ndk/guides/index.html#download-ndk).
    - Verify that `$ANDROID_HOME` is properly set for your current and future shells
- Connect your phone in USB debug mode or use an Android Virtual Device
    - If using a physical phone, verify that the device is visible with the command `adb devices`
    - To create an Android Virtual Device, follow the steps under "Preparing the Android device" for "Building Projects with Native Code":
        - https://facebook.github.io/react-native/docs/0.51/getting-started.html
- Install the Go toolchain:
    - https://golang.org/doc/install
    - Setup your [GOPATH environmental variable](https://github.com/golang/go/wiki/SettingGOPATH)
- Install and init gomobile:
    - `gomobile init` should automatically pickup the Android NDK if it is installed through the SDK Manager and `$ANDROID_HOME` is set. Otherwise you need to use the `-ndk` option.
    ```
    go get golang.org/x/mobile/cmd/gomobile
    gomobile init
    ```
- Clone this project so it is located inside your `$GOPATH`, and fetch Go dependencies:
    - `go get github.com/privacybydesign/irma_mobile/irmagobridge/...` should do the trick
- Install javascript dependencies using Yarn or NPM:
    ```
    cd $GOPATH/github.com/privacybydesign/irma_mobile
    yarn
    ```
- Start the app in debug mode:
    ```
    yarn android
    ```

## Developing for iOS

Full instruction are coming soon. Following the "Building Projects with Native Code" guide for iOS and the gomobile steps for Android (see above) should go a long way. You can then fire up Xcode and press ⌘R; the compilation of the `irmagobridge` is handled by Xcode.

### Troubleshooting
- If Javascript compilation fails with an error that some source cannot be resolved or located (i.e. cannot resolve 'lib/...', 'store/...'), it often helps to clear the Babel build cache with `yarn start --reset-cache`. You may need to kill old Node server (`killall node`) if you get a port binding error.
- If you get this error during compilation of the go bridge for Android:

  ```
  seq_android.c:213:3: error: implicitly declaring library function 'memcpy' with type 'void *(void *, const void *, unsigned long)' [-Werror,-Wimplicit-function-declaration]
  seq_android.c:213:3: note: include the header <string.h> or explicitly provide a declaration for 'memcpy'
  ```

  Then you have a too new version of the Android NDK (>=r16), see here: https://github.com/golang/go/issues/22766

  You can workaround this by including `string.h` in the following file: `$GOPATH/src/golang.org/x/mobile/bind/java/seq_android.c.support`
- If you get this error during running on Android in debug mode:

  ```
  adb server version (36) doesn't match this client (39); killing...
  ```

  Then try `adb reconnect`
