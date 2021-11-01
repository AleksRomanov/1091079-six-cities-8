import {Redirect, Route, RouteProps} from 'react-router-dom';
import {AppRoute, authorizationStatuses} from '../constants';
import {State} from '../types/state';
import {Dispatch} from 'redux';
import {Actions} from '../types/action';
import {connect, ConnectedProps} from 'react-redux';

function mapStateToProps({authorizationStatus}: State) {
  return ({
    authorizationStatus,
  });
}
function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    // onSelectCity(city: string) {
    //   dispatch(selectCity(city));
    //   dispatch(getOffersByCity());
    //   // dispatch(getOffersByCity())
    // },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type PrivateRouteProps = RouteProps & PropsFromRedux & {
  render: () => JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {exact, path, render, authorizationStatus} = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === authorizationStatuses.Auth ? render() : <Redirect to={AppRoute.Login}/>
      )}
    />
  );
}

export default connector(PrivateRoute);
