// The structure of the Root component is a bit different than most components
// Hierarchy of: RootProvider -> RootContainer -> RootNavigatorContainer -> RootNavigator

// The root tree is expected to never unmount. Instead the entire app is killed.

export default from './RootProvider';
