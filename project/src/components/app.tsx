import Main from './pages/main';
import Offer from './pages/offer';
import {AppRoute, AuthorizationStatus} from '../constants';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from './private-route';
import Favorites from './pages/favorites';
import Login from './pages/login';
import {State} from '../types/state';
import {connect, ConnectedProps} from 'react-redux';
import Page404 from './pages/404';

const mapStateToProps = ({authorizationStatus, isDataLoaded}: State) => ({
  authorizationStatus,
  isDataLoaded,
});

const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

function App({authorizationStatus, isDataLoaded}: PropsFromRedux): JSX.Element {
  const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Unknown;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <p>Loading ...</p>
    );
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        <Route path={AppRoute.Offer} exact render={() => <Offer/>}/>
        <Route path={AppRoute.Login} exact><Login/></Route>
        <PrivateRoute path={AppRoute.Favorites} render={() => <Favorites/>}/>
        <Route render={(props) => (<Page404/>)}/>
      </Switch>
    </BrowserRouter>
  );
}

export default connector(App);
