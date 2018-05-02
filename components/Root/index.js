// The structure of the Root component is a bit different than most components
// Hierarchy of: RootProvider -> RootContainer -> RootNavigatorContainer -> RootNavigator

// I would've expected that the Root tree never gets unmounted (unless perhaps the app is killed),
// but this happens a lot in practice, error reports tell.

export default from './RootProvider';
