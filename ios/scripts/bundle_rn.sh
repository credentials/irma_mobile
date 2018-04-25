export SENTRY_PROPERTIES=sentry.properties
export NODE_BINARY=node

if [ "$CONFIGURATION" = "Debug" ]; then
    ../node_modules/react-native/scripts/react-native-xcode.sh
else
    ../node_modules/@sentry/cli/sentry-cli react-native xcode ../node_modules/react-native/scripts/react-native-xcode.sh
fi