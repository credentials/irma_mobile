irma_mobile
===========

This application is still under development and not ready for use.


## Developing on Android phone

- Install Android SDK tools
    - https://developer.android.com/studio/index.html#downloads
- Install Android NDK tools
    - https://developer.android.com/ndk/downloads/index.html
- Connect phone in USB debug mode
    - Verify if device is visible with the command `adb devices`
- Install javascript/react-native dependencies
    ```
    yarn  # or 'npm install'
    ```
- Install gomobile:
    ```
    go get golang.org/x/mobile/cmd/gomobile
    ```
- Symlink irmagobridge package
    ```
    cd $GOPATH/src/github.com/credentials 
    ln -s /PATH/TO/SRC/CODE/irma_mobile/irmagobridge
    ```
- Init and build go package:
    ```
    cd /PATH/TO/SRC/CODE/irma_mobile/android/irmagobridge
    gomobile init -ndk /opt/android-ndk/
    gomobile bind -target android github.com/credentials/irmagobridge
    ```
- Start the app in debug mode:
    ```
    yarn run android
    ```

### Troubleshooting
- If you get this error during compilation of the go bridge:

  ```
  seq_android.c:213:3: error: implicitly declaring library function 'memcpy' with type 'void *(void *, const void *, unsigned long)' [-Werror,-Wimplicit-function-declaration]
  seq_android.c:213:3: note: include the header <string.h> or explicitly provide a declaration for 'memcpy'
  ```

  Then you have a too new version of the Android NDK (>=r16), see here: https://github.com/golang/go/issues/22766
  
  You can workaround this by including `string.h` in the following file: `$GOPATH/src/golang.org/x/mobile/bind/java/seq_android.c.support`
- If you get this error during running in debug mode:

  ```
  adb server version (36) doesn't match this client (39); killing...
  ```

  Then try `adb reconnect`
