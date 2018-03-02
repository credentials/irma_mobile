import { NavigationActions } from 'react-navigation';

// Reset navigation via dispatch in a less verbose way
export const resetNavigation = (navigationDispatch, ...routes) => {
  const actions = routes.map(route =>
    NavigationActions.navigate(
      typeof route === 'string' ?
        {routeName: route} : route
    )
  );

  navigationDispatch(
    NavigationActions.reset({
      index: routes.length - 1,
      actions
    })
  );
};
