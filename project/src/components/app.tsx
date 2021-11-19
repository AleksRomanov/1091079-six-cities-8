import Main from './pages/main';
import Offer from './pages/offer';
import {AppRoute, AuthorizationStatus} from '../constants';
import React, {useEffect, useState} from 'react';
import {Router as BrowserRouter, Route, Switch, useParams} from 'react-router-dom';
import PrivateRoute from './private-route';
import Favorites from './pages/favorites';
import Login from './pages/login';
import {State} from '../types/state';
import {connect, ConnectedProps} from 'react-redux';
import Page404 from './pages/404';
import browserHistory from '../browser-history';
import {useCheckAuthQuery, useFetchOffersQuery} from '../services/apiPoke';
import {loadOffers, setAuthStatus} from '../store/new-reducer';
import {useAppDispatch} from '../hooks/useAppDispatch';


function App(): JSX.Element {
  const dispatch = useAppDispatch();

  let {data, isLoading} = useFetchOffersQuery(arguments);
  data && dispatch(loadOffers(data));

  // let {isSuccess} = useCheckAuthQuery(arguments);
  // isSuccess ? dispatch(setAuthStatus(AuthorizationStatus.Auth)) : dispatch(setAuthStatus(AuthorizationStatus.NoAuth));

  if (isLoading) {
    return (
      <p>Loading ...</p>
    );
  }
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main/>
        </Route>
        {/*<Route path={AppRoute.Offer} exact render={() => <Offer/>}/>*/}
        {/*<Route path={AppRoute.Login} exact><Login/></Route>*/}
        {/*<PrivateRoute path={AppRoute.Favorites} render={() => <Favorites/>}/>*/}
        {/*<Route render={() => (<Page404/>)}/>*/}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
