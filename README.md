_This project is deprecated and therefore not maintained anymore. The live repository of the IRMA app is now at [github.com/privacybydesign/irmamobile](https://github.com/privacybydesign/irmamobile) (without underscore)._

irma_mobile
===========

### Authentication made easy, privacy-friendly, and secure

IRMA offers a privacy-friendly, flexible and secure solution to many authentication problems, putting the user in full control over his/her data.

The IRMA app manages the user's IRMA attributes: receiving new attributes, selectively disclosing them to others, and attaching them to signed statements. These attributes can be relevant properties, such as: "I am over 18", "my name is ..." and "I am entitled to access ....". They are only stored on the user's device and nowhere else.

<img src="https://credentials.github.io/images/irma_mobile/2-android.png" width="200" alt="Screenshot of the IRMA app on Android, showing the 'Your Attributes' screen with four credentials." /> &nbsp;
<img src="https://credentials.github.io/images/irma_mobile/1-ios.png" width="200" alt="Screenshot of the IRMA app on iOS, showing the 'Your Attributes' screen with two credentials." /> &nbsp;
<img src="https://credentials.github.io/images/irma_mobile/4-android.png" width="200" alt="Screenshot of the IRMA app on Android, showing the 'disclose these attributes?' screen." />
<img src="https://credentials.github.io/images/irma_mobile/3-ios.png" width="200" alt="Screenshot of the IRMA app on iOS, showing the PIN entry screen during a disclosure session." /> &nbsp;

## Building the app for development

- Follow the steps for "Installing dependencies" for "Building Projects with Native Code" (not the "Quick Start"):
    - https://facebook.github.io/react-native/docs/0.59/getting-started.html (you may skip the step to install `react-native-cli`)
    - Yarn is used for Javascript dependency management in this guide, but npm should work as well (except for compatibility with `yarn.lock`): https://yarnpkg.com/en/docs/install
    - **Android**:
      - The Android NDK should also be installed through the SDK Manager. This can be done by checking the 'LLDB', 'CMake', and 'NDK' options in the [SDK Tools tab](https://developer.android.com/ndk/guides/index.html#download-ndk).
      - Verify that `$ANDROID_HOME` is properly set for your current and future shells
- Install the Go toolchain and Dep package manager:
    - https://golang.org/doc/install
    - Setup your [GOPATH environmental variable](https://github.com/golang/go/wiki/SettingGOPATH)
    - We use Dep to install specific git revisions of Go packages: https://golang.github.io/dep/docs/installation.html
- Install and init gomobile:
    - This will take a (quiet) while:
    ```
    go get golang.org/x/mobile/cmd/gomobile
    gomobile init
    ```
    - **Android**:
      - `gomobile init` should automatically pickup the Android NDK if it is installed through the SDK Manager and `$ANDROID_HOME` is set. Otherwise you need to use the `-ndk` option.
- Clone this project so it is located inside your `$GOPATH`:
    - `go get github.com/privacybydesign/irma_mobile` should do the trick
    - You can ignore the `no Go code` warning; we fetch the dependencies of the `irmagobridge` subpackage via Dep.
- Install Javascript dependencies using Yarn or NPM, and vendor Go dependencies:
    ```
    cd $GOPATH/src/github.com/privacybydesign/irma_mobile
    yarn install
    dep ensure
    ```
- Connect your phone with a cable, or use a simulator
    - **iOS**:
      - By default, a new simulator is automatically created when building the app in the next step. See `yarn run react-native run-ios --help` for more options.
    - **Android**:
      - If using a physical phone, verify that the device is visible with the command `adb devices`
      - To create an Android Virtual Device, follow the steps under "Preparing the Android device" for "Building Projects with Native Code": https://facebook.github.io/react-native/docs/0.51/getting-started.html
      - By default, the only available device or simulator will be used when running the app in the next step. See `yarn run react-native run-android --help` for more options.

- Build and run the app for development:
    ```
    yarn run ios
    ```
    or
    ```
    yarn run android
    ```
    - Alternatively, Xcode or Android Studio can be used to launch the app and use the IDE tools.

### Troubleshooting
- If Javascript compilation fails with an error that some source cannot be resolved or located (i.e. cannot resolve 'lib/...', 'store/...'), it often helps to clear the Babel build cache with `yarn start --reset-cache`. You may need to kill old Node server (`killall node`) if you get a port binding error.

- If you get the following error during compilation of the go bridge on Go 1.10, `package gobind: cannot find package "gobind" in any of" by upgrade go and gomobile`, try to upgrade gomobile to the latest version and run `gomobile init` again (see gomobile issue 108336).

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

- If your iOS build seems to fail with `error: An organization slug is required (provide with --org)`, this actually isn't a fatal error and IRMA.app will be successfully installed to your device. The error is due to a `sentry.properties` file which isn't necessary in development. This should be fixed to not be a failure in development.
- If running `gomobile init` gives the error:

  ```
  gomobile: /usr/local/go/bin/go install golang.org/x/mobile/cmd/gobind failed: exit status 1
  ../src/golang.org/x/mobile/internal/importers/ast.go:37:2: cannot find package "golang.org/x/tools/go/packages" in any of:
  ```
  Install the following package: `go get golang.org/x/tools/go/packages`.

### Manual testing

We use BrowserStack to test on actual devices:

<a href="https://browserstack.com"><img src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" height="80" /></a>
