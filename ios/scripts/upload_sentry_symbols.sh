export SENTRY_PROPERTIES=sentry.properties

if [ "$CONFIGURATION" != "Debug" ]; then
  ../node_modules/@sentry/cli/sentry-cli upload-dsym
fi