import {Redirect, Route, RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../constants';
import {State} from '../types/state';
import {connect, ConnectedProps} from 'react-redux';

function mapStateToProps({authorizationStatus}: State) {
  return ({
    authorizationStatus,
  });
}

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

type PrivateRouteProps = RouteProps & PropsFromRedux & {
  render: () => JSX.Element;
}

function PrivateRoute({exact, path, render, authorizationStatus}: PrivateRouteProps): JSX.Element {

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

export default connector(PrivateRoute);
