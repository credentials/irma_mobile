export default {
  'detox': {
    'configurations': {
      'ios.sim.debug': {
        'binaryPath': 'ios/build/Build/Products/Debug-iphonesimulator/IRMA.app',
        'build': 'xcodebuild -project ios/IRMA.xcodeproj -scheme IRMA -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
        'type': 'ios.simulator',
        'name': 'iPhone 6'
      }
    },
    'test-runner': 'jest',
    'runner-config': 'e2e/runnerConfig.json'
  },
};
