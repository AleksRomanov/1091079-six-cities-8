import {Redirect, Route} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStat} from '../../constants';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
  authorizationStat: AuthorizationStat;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {exact, path, render, authorizationStat} = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStat === AuthorizationStat.Auth ? render() : <Redirect to={AppRoute.Login}/>
      )}
    />
  );
}

export default PrivateRoute;
