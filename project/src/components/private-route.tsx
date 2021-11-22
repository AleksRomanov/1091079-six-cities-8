import {Redirect, Route, RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../constants';
import {useAppSelector} from '../hooks/useAppSelector';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

function PrivateRoute({exact, path, render}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.app.authorizationStatus);
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth ? render() : <Redirect to={AppRoute.Login}/>
      )}
    />
  );
}

export default PrivateRoute;
